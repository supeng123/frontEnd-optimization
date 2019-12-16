### how to customize an eslint and tslint project
#### 1. create new folder in your project named "slogan_eslint_plugin"
#### 2. in "slogan_eslint_plugin", create a new package.json and index.js
#### 3. in package.json, wirte eslint version and name "eslint-plugin-slogan"
~~~
{
	"name": "eslint-plugin-slogan",
    "version": "0.0.1",
	"main": "index.js",
	"devDependencies": {
        "eslint": "^6.7.2"
	}
}
~~~
#### 4. in index.js, write the customized rules(example no-absolute-path)
~~~
module.exports = {
    rules: {
        "no-absolute-path": {
            create: function (context) {
                function reportIfAbsolute(source) {
                  if (isAbsolute(source.value)) {
                    context.report(source, 'Do not import modules using an absolute path')
                  }
                }
            
                const options = Object.assign({ esmodule: true, commonjs: true }, context.options[0])
                return visitModules(reportIfAbsolute, options)
              },
         }  
    }
  }

  function isAbsolute(source) {
    const filterList = ['admin-core', 'admin', 'admin-ui'];
    return source.indexOf('/') === 0 ||
        (filterList.includes(source.split('/')[0]) && source.indexOf('/') > 0);
  }

  function visitModules(visitor, options) {
    // if esmodule is not explicitly disabled, it is assumed to be enabled
    options = Object.assign({ esmodule: true }, options)
  
    let ignoreRegExps = []
    if (options.ignore != null) {
      ignoreRegExps = options.ignore.map(p => new RegExp(p))
    }
  
    function checkSourceValue(source, importer) {
      if (source == null) return //?
  
      // handle ignore
      if (ignoreRegExps.some(re => re.test(source.value))) return
  
      // fire visitor
      visitor(source, importer)
    }
  
    // for import-y declarations
    function checkSource(node) {
      checkSourceValue(node.source, node)
    }
  
    // for esmodule dynamic `import()` calls
    function checkImportCall(node) {
      if (node.callee.type !== 'Import') return
      if (node.arguments.length !== 1) return
  
      const modulePath = node.arguments[0]
      if (modulePath.type !== 'Literal') return
      if (typeof modulePath.value !== 'string') return
  
      checkSourceValue(modulePath, node)
    }
  
    // for CommonJS `require` calls
    // adapted from @mctep: http://git.io/v4rAu
    function checkCommon(call) {
      if (call.callee.type !== 'Identifier') return
      if (call.callee.name !== 'require') return
      if (call.arguments.length !== 1) return
  
      const modulePath = call.arguments[0]
      if (modulePath.type !== 'Literal') return
      if (typeof modulePath.value !== 'string') return
  
      checkSourceValue(modulePath, call)
    }
  
    function checkAMD(call) {
      if (call.callee.type !== 'Identifier') return
      if (call.callee.name !== 'require' &&
          call.callee.name !== 'define') return
      if (call.arguments.length !== 2) return
  
      const modules = call.arguments[0]
      if (modules.type !== 'ArrayExpression') return
  
      for (let element of modules.elements) {
        if (element.type !== 'Literal') continue
        if (typeof element.value !== 'string') continue
  
        if (element.value === 'require' ||
            element.value === 'exports') continue // magic modules: http://git.io/vByan
  
        checkSourceValue(element, element)
      }
    }
  
    const visitors = {}
    if (options.esmodule) {
      Object.assign(visitors, {
        'ImportDeclaration': checkSource,
        'ExportNamedDeclaration': checkSource,
        'ExportAllDeclaration': checkSource,
        'CallExpression': checkImportCall,
      })
    }
  
    if (options.commonjs || options.amd) {
      const currentCallExpression = visitors['CallExpression']
      visitors['CallExpression'] = function (call) {
        if (currentCallExpression) currentCallExpression(call)
        if (options.commonjs) checkCommon(call)
        if (options.amd) checkAMD(call)
      }
    }
  
    return visitors
  }
~~~

#### 5. run 'npm install -S slogan_eslint_plugin' and "eslint-plugin-slogan" will be installed in node_modules

#### 6. write .eslintrc.js in the project root directory and uses lint-plugin-slogan plugin
~~~
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFatures": {
            "jsx": true
        },
        "sourceType": "module",
        "project": './tsconfig.json'
    },
    "plugins": [
        "slogan",
        "@typescript-eslint"
    ],
    "rules": {
        "slogan/no-absolute-path": 2
    },
};
~~~
#### 7.install @typescript-eslint-parser in your project to parse typescript files
#### 8.write tsconfig.json
~~~
{
  // extend your base config so you don't have to redefine your compilerOptions
  "include": [
    "./src/**/*.ts",
    "./src/**/*.js"
  ]
}
~~~
#### 9.run ./node_modules/.bin/eslint ./src/*/**.js ./src/*/**.js to check if the new rule works.

### how to write the customize tslint rule
#### 1.write the rule file under directory slogan_ts_plugin named tsxNoAbsolutePathRule.ts
~~~
import * as ts from "typescript";  
import * as Lint from "tslint";

export class Rule extends Lint.Rules.AbstractRule {  
    // tslint:disable object-literal-sort-keys
    public static metadata: Lint.IRuleMetadata = {
        ruleName: "tsx-no-absolute-path",
        description: "Forbidden the usage of absolute path in typescript-react component",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "functionality",
        typescriptOnly: true
    };
    // tslint:enable object-literal-sort-keys

    public static FAILURE_STRING = "Do not import modules using an absolute path";

    public apply(sourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoAbsolutePathWalker(sourceFile, this.getOptions()));
    }
}

class NoAbsolutePathWalker extends Lint.RuleWalker {  
    public visitStringLiteral(node: ts.StringLiteral) {
        // create a failure at the current position
        // console.log(node.moduleSpecifier['text'])
        console.log(node)
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));

        // call the base version of this visitor to actually parse this node
        // super.visitImportDeclaration(node);
        super.visitStringLiteral(node);
    }
}
~~~
#### 2.config the tsconfig.json
~~~
{
    "compilerOptions": {
        "module": "CommonJS",
        "moduleResolution": "Node"
    }
}
~~~
#### 3.config the tslint.json
~~~
{
	"rulesDirectory": "./slogan_ts_plugin/",
	"rules": {
		"tsx-no-absolute-path": true
	}
}
~~~
#### 4.run the rules ts-node node_modules/.bin/tslint ./src/*/**.ts
