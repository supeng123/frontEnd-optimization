import Document, {Html, Head, Main, NextScript} from 'next/document'
import { ServerStyleSheet } from 'styled-component'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const originalRenderPage = ctx.renderPage()
        const sheet = new ServerStyleSheet()

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => (props) => sheet.collectStyles(<App {...props} />),
            });
            const props = await Document.getInitialProps(ctx)
            return {
                ...props,
                styles: <>{props.styles}{sheet.getStyleElement()}</>
            }
        } finally {
            sheet.seal()
        }
    }

    render () {
        return <Html>
            <Head>
            <style>{`.test {color: red}`}</style>
            </Head>
            <Main />
            <NextScript />
        </Html> 
    }
}

export default MyDocument