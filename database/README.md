## Start, Stop, Reboot Mysql Server
~~~
sudo /usr/local/mysql/support-files/mysql.server start
sudo /usr/local/mysql/support-files/mysql.server stop
sudo /usr/local/mysql/support-files/mysql.server restart
~~~
## Login Into Mysql
~~~
-H host
-P port
mysql (-H -P) -u root -p

//check the database version
select version()
~~~
### Common Commands
~~~
//check the databases
SHOW DATABASES;

//use the specific database
USE test;

//show tables from mysql
SHOW TABLES FROM mysql;

//check the current database
SELECT DATABASE();

 //create table;
 CREATE TABLE studentInfo(id int, name varchar(20));

 //check tables in database
 SHOW tables;

 //check table structure    
 DESC studentInfo;

 //show all data in the table
 SELECT * FROM studentInfo;

 //insert data into table
 INSERT INTO studentInfo (id, name) VALUES(1, 'slogan');

 //delete one data
 DELETE FROM studentInfo WHERE id=1;
~~~
### Select
~~~
SELECT last_name, salary, email FROM employees;

//use alias
SELECT last_name as lastName, first_name as firstName FROM employees;

//remove repeated data
SELECT DISTINCT depart_number FROM depart_table

//concat string
SELECT CONCAT(last_name, first_name) from employees

//IFNULL
SELECT CONCAT(last_name, first_name, IFNULL(commission_rate, 0) AS money) from employees
~~~

### Conditional Select
~~~
>, <, =, !=, <>, >=, <=
&&, ||, !, and, or, not,

SELECT * FROM employees WHERE NOT(department_id >= 90 && department_id <= 100) or salary > 15000;
SELECT * FROM employees WHERE NOT(department_id BETWEEN 90 AND 100) or salary > 15000;

like, between and, in, is null

//check all people with the last_name contains slo
SELECT * FROM employees WHERE last_name LIKE '%slo%';

//select last_name, salary from the employees with their names' third letter is e, the fifth letter is a
SELECT last_name, salary, FROM employees WHERE last_name like '__e_a%'

//transformate string
SELECT last_name FROM employees WHERE last_name like '_\_%';
SELECT last_name FROM employees WHERE last_name like '_$_%'' ESCAPE '$';

//use in to replace or
SELECT last_name, job_id FROM employees WHERE job_id = 'IT_PORT' OR job_id = 'HR' OR job_id = 'programer';
SELECT last_name, job_id FROM employees WHERE job_id IN ('IT_PORT','HR','programer');

//is null and <=>
SELECT last_name, commission_rate, FROM employees WHERE commission_rate IS NULL;
SELECT last_name, commission_rate, FROM employees WHERE commission_rate <=> NULL;

//is not null
SELECT last_name, commission_rate, FROM employees WHERE commission_rate IS NOT NULL;
~~~

### Sequence Select
~~~
// order by desc
SELECT * FROM employees WHERE department_id >= 90 ORDER BY salary DESC

//order by alias
SELECT * , salary*12(1 + IFNULL(commission_rate, 0)) AS money FROM employees ORDER BY money ASC
//order by expressions and multiple parameters
SELECT LENGTH(last_name) AS string_length, last_name, salary FROM employees ORDER BY LENGTH(last_name) DESC, id ASC
~~~
### String Functions
~~~
SELECT CONCAT(UPPER(last_name), LOWER(first_name)) AS names FROM employees;

SELECT SUBSTR('this is the first time', 1, 5) AS out_put;

SELECT CONCAT(UPPER(SUBSTR(last_name, 1, 1)), LOWER(first_name)) AS out_put;

//return the first index, if does not find, return zero
SELECT INSTR('this is is the balal', 'balal') AS out_put;

SELECT LENGTH(TRIM('   is ')) AS out_put;
SELECT TRIM('a' FROM 'aaaaabbbbbaccacaaaaa') AS out_put;

SELECT LPAD('lllll', 10 , '*') AS out_put;

SELECT REPLACE('LLLLLLLLLLBBBBB', 'B', 'C') AS out_put;
~~~
### Math Functions
~~~
SELECT ROUND(-1.55);

SELECT CEIL(1.52);

SELECT FLOOR(1.52);

SELECT TRUNCATE(1.52, 1);

SELECT MOD(10, 3);
~~~

### Date Function
~~~
SELECT NOW();

SELECT CURDATE();

SELECT CURTIME();

SELECT YEAR(NOW()) AS NIAN;
SELECT MONTH(NOW()) AS NIAN;
SELECT DAY(NOW()) AS NIAN;

// str_to_date
SELECT STR_TO_DATE('1998-3-2', '%Y-%c-%d') AS output;

//date_format
SELECT DATE_FORMAT(NOW(), '%y年%m月%d日') AS output;

SELECT last_name, DATE_FORMAT(hiredate, '%m/%d %y') AS time FROM employees;
~~~
### Process Control Functions
~~~
SELECT last_name, commission_pct, IF(commission_pct IS NULL, 'no money', 'yes money') AS info FROM employees;

SELECT salary AS originMoney, department_id,
CASE department_id
WHEN 30 THEN salary*1.1
WHEN 40 THEN salary*1.5
WHEN 50 THEN salary*1.7
ELSE salary
END AS newMoney
FROM employees;

SELECT salary AS originMoney, department_id,
CASE
WHEN salary> 20000 THEN 'A'
WHEN salary> 15000 THEN 'B'
WHEN salary> 10000 THEN 'C'
ELSE 'D'
END AS level
FROM employees;

~~~ 
### Group Functions
~~~
// all functions ignore Null
SELECT SUM(salary) FROM employees;
SELECT AVG(salary) FROM employees;
SELECT MIN(salary) FROM employees;
SELECT MAX(salary) FROM employees;
SELECT COUNT(salary) FROM employees;

SELECT COUNT(DISTINCT(salary)) FROM employees;

SELECT DATEDIFF(MAX(hiredate), MIN(hiredate)) AS 'different days' FROM employees;
~~~
### Group By && Having
~~~
//need group functions
SELECT AVG(salary), job_id FROM employees GROUP BY job_id;

//
SELECT COUNT(*) AS 'each department numbers', location_id FROM employees GROUP BY location_id;

//
SELECT AVG(salary), department_id FROM employees WHERE email LIKE '%a%' GROUP BY department_id;

//check the which department has people's number larger than 2
SELECT COUNT(*), department_id FROM employees GROUP BY department_id HAVING COUNT(*) > 2

SELECT MIN(salary), manager_id FROM employees WHERE mangaer_id > 102 GROUP BY manager_id HAVING MIN(salary) > 5000
~~~
### Multiple Tables
~~~
SELECT name, bodyName FROM boys, beauty WHRER beauty.boyfriend_id = boys.id;

SELECT bo.* FROM boys AS bo WHERE bo.id IN (SELECT boyfriend_id FROM beauty)

SELECT bo.* FROM boys AS bo WHERE bo.id EXIST (SELECT boyfriend_id FROM beauty WHERE bo.id = beauty.boyfriend_id)

types
//inner join
equal join
not equal join
self join
//outter join
left outter join
right outter join
full outter join

~~~
#### equal join
~~~
SELECT last_name, department_name FROM employees, departments WHERE employees.department_id = departments.dempartment_id;

SELECT e.last_name, e.job_id, j.job_title FROM employees AS e, jobs AS j, WHERE e.job_id = j.job_id

SELECT last_name, department_name, city
FROM employees AS e, departments AS d, locations AS l
WHERE e.department_id = d.department_id
AND d.location_id = l.location_id
AND city LIKE '%s%'
ORDER BY department_name DESC;


SELECT department_name, job_title, MIN(salary) AS money
FROM employees AS e, departments AS d, jobs AS j
WHERE e.department_id = d.department_id
AND e.job_id = j.job_id
GROUP BY department_name, job_title

SELECT country_id, COUNT(*)
FROM departments AS d, locations AS l
WHERE d.location_id = l.location_id
GROUP BY l.country_id
HAVING COUNT(*) > 2
~~~
#### not equal join
~~~
SELECT salary, grade_level
FROM employees AS e, job_grades AS j
WHERE salary BETWEEN j.lower_sal AND j.highest_sal
~~~
#### self join
~~~
SELECT e.employee_id, e.last_name, m.employee_id, m.last_name
FROM employees AS e, employees AS m,
WHERE e.manager_id = m.employee_id;
~~~
#### sql99 syntax
~~~
select (column_names)
from (table_name alias) (join_type inner|left|right|full|cross)
join (table_name alias)
on (join condition)
where (filter condition)
group by (filter condition)
having (filter condition)
order by (ASC|DESC)
~~~
#### sql99 inner join
~~~
SELECT last_name, department_name FROM employees AS e
INNER JOIN department AS d
ON e.department_id = d.department_id;

SELECT last_name, department_name, job_title
FROM employees AS e
INNER JOIN departments AS d ON e.department_id = d.department_id
INNER JOIN jobs AS j ON e.job_id = j.job_id
ORDER BY department_name DESC;

SELECT salary, grade_level, COUNT(*)
FROM employees AS e
INNER JOIN job_grades AS g
ON e.salary BETWEEN g.lower_sal and g.high_sal;
GROUP BY grade_level
HAVING COUNT(*) > 20
ORDER BY grade_level DESC
~~~

#### sql99 outer join
~~~
left , right depend on which table being chosed as primary table, generally we chose the paramters
from primary table so this table will be the primary table

SELECT g.name b.name
FROM boys AS b
RIGHT OUTER JOIN girls AS g
ON g.boyfriend_id = b.id
WHERE b.id IS NULL

//alternative 
SELECT g.name b.name
FROM girls AS g
LEFT OUTER JOIN boys AS b
ON g.boyfriend_id = b.id
WHERE b.id IS NULL


SELECT e.*, d.department_name
FROM departments AS d
LEFT OUTER JOIN employees e
ON d.department_id = e.department_id
WHERE d.department_name IN ('SAL', 'IT')
~~~ 

#### other examples
~~~
SELECT employee_id, last_name, salary, e.department_id
FROM employee e
INNER JOIN (
    SELECT AVG(salary) ag, department_id FROM employees GROUP BY department_id
) ag_dep
ON e.department_id = ag_dep.department_id
WHERE salary > ag_dep.ag;

SELECT employee_id FROM employees WHERE department_id = ANY(
    SELECT DISTINCT department_id FROM departments WHERE location = 1700
)

SELECT substr(email, 1, instr(email, '@') -1 ) FROM studentInfo
~~~

#### pagination
~~~
//limit offset (from 0 start), size( the number you want to give)
//generally the limit formulation could be (offset -1) * size, size
SELECT * FROM employees WHERE commission_pct IS NOT NULL
ORDER BY salary DESC
LIMIT 0 10;

~~~

### Child Join
~~~
// after WHERE or HAVING
//single row (inlude > < <> =>), all the child show return single row
SELECT * 
FROM employees
WHERE salary > (
    SELECT salary FROM employees WHERE last_name = 'Abel'
);

SELECT last_name, job_id, salary
FROM employees
WHERE job_id = (
    SELECT job_id FROM employees WHERE employee_id = 141
) AND salary > (
    SELECT salary FROM employees WHERE employee_id = 143
) OR salary = (
    SELECT MIN(salary) FROM employees
);


SELECT MIN(salary), department_id 
FROM employees
GROUP BY department_id
HAVING MIN(salary) > (
    SELECT MIN(salary)
    FROM employees
    WHERE department_id = 50
)

//multiple rows( in, any/some, all)
SELECT last_name
FROM employees
WHERE department_id IN (
    SELECT department_id FROM departments WHERE location_id IN (1400, 1700)
)

//alternative
SELECT last_name FROM employees AS e
LEFT OUT JOIN departments AS d
ON e.department_id = d.department_id
WHERE d.location_id IN (1400, 1700)


SELECT last_name, employee_id, job_id, salary
FROM employees
WHERE salary < ANY(
    SELECT DISTINCT salary
    FROM employees
    WHERE job_id = 'IT_PROG'
) AND job_id <> 'IT_PROG'

//alternative
SELECT last_name, employee_id, job_id, salary
FROM employees
WHERE salary <(
    SELECT MIN(salary)
    FROM employees
    WHERE job_id = 'IT_PROG'
) AND job_id <> 'IT_PROG'

//mutiple column, multiple row
SELECT * 
FROM employees
WHERE (employee_id, salary) = (
    SELECT MIN(employee_id), MAX(salary) FROM employees
);
~~~
### child selection after select
~~~
SELECT d.*, (
    SELECT COUNTS(*)
    FROM employees e
    where e.dapartment_id = d.department_id
) AS counts FROM departments d;

//alternative
SELECT COUNTS(*) 
FROM employees e
JOIN departments d
WHERE e.department_id = d.department_id
GROUP BY department_id
~~~
### child selection after from
~~~
SELECT ag_dep.*, g.grade_level
FROM (
    SELECT AVG(salary) ag, department_id
    FROM employees
    GROUP BY department_id
) ag_dep
INNER JOIN job_grades g
ON ag_dep.ag BETWEEN lowest_sal AND highest_salary;

~~~
## Data Manipulation Language
~~~
INSERT INTO beauty(id, name, sex, borndate, phone, photo, boyfriend_id)
VALUES(13, 'tangyix', 'female', '1990-4-30', '12243453455',NULL, 2)

INSERT INTO beauty
VALUES(13, 'tangyix', 'female', '1990-4-30', '12243453455',NULL, 2)
,(14, 'tangyixi', 'female', '1990-4-30', '12243453455',NULL, 1)
,(15, 'ee', 'male', '1990-4-30', '12243453455',NULL, 2);

INSERT INTO beauty
SET SET id=19, name='liti', phone='1242356535'

UPDATE beauty SET phone='31242455' WHERE name LIKE '%tang%';

UPDATE boys bo 
INNER JOIN beauty b 
ON bo.id = b.boyfriend_id
SET b.phone = '114'
WHERE bo.boyname = 'zzzz'

UPDATE boys bo
RIGHT JOIN beauty b
ON bo.id = b.boyfriend_id
SET b.boyfriend_id = 2
WHERE b.id IS NULL

DELETE FROM beauty WHERE phone LIKE '%9%';

DELETE b
FROM beauty b
INNER JOIN boys bo
ON b.boyfriend_id = bo.id
WHRE bo.boyname = 'zwj'

truncate table beauty
~~~
### Data Define Language
~~~
//define database
CREATE DATABASE IF NOT EXISTS books;
USE books;
ALTER DATABASE books CHRACTER SET UTF8
DROP DATABASE IF EXISTS books;

//define table
CREATE TABLE IF NOT EXISTS book (
    id INT,
    bname VARCHAR(20),
    price DOUBLE,
    authorId INT,
    publishDate DATETIME
)

DESC book

DROP TABLE IF EXISTS book
~~~
#### modify table
~~~
//modify the column of table
ALTER TABLE book CHANGE COLUMN publishDate pubDate DATETIME;

//modify the column type of table
ALTER TABLE book MODIFY COLUMN publishDate TIMESTAMP;

//add new column
ALTER TABLE book ADD COLUMN annual DOUBLE;

//delete one column
ALTER TABLE book DROP COLUMN annual;

//modify the table name
ALTER TABLE book RENAME TO book_author;
~~~
#### copy table
~~~
//copy part of table structure
CREATE TABLE copy1
SELECT id, au_name
FROM author
WHERE 0;

//copy all table structure
CREATE TABLE copy2 LIKE author;

//copy all the table structure and data
CREATE TABLE copy3
SELECT * FROM author;

//copy part of table structure and data
CREATE TABLE copy4
SELECT id, au_name
FROM newDatabase.author
WHERE nation="China"
~~~
### Types
~~~
INT, using UNSIGNED to delare the paramter can be - or +
FLOAT(M,D), M for the int part + D part, D for the decimal part
DOUBLE(M,D)
DECIMAL(M,D)
CHAR
VARCHAE save the memory
TEXT
BLOB

ENUM
SET

DATETIME
TIMESTAMP
CREATE TABLE tab_char(
    c1 ENUM('a', 'b', 'c')
)
~~~
### Transaction
~~~
//prerequiste
set autocommit=0;
start transaction;
//actions
UPDATE account SET balance =500 WHERE username= 'lll';
SAVEPOINT a;
UPDATE account SET balance =500 WHERE username= 'zzz';
ROLLBACK TO a;
//commit
commit
//rollback;

SET names gbk;

select @@tx_isolation
set session transaction isolation level read uncommitted;

set session transaction isolation level read committed;

set session transaction isolation level repeatable read;

set session transaction isolation level serializable;
~~~
### View
~~~
//create view
CREATE VIEW myview
AS
SELECT last_name, department_name, job_title
FROM employees e
JOIN departments d ON e.department_od = d.department_id
JOIN jobs j ON j.job_id = e.job_id

SELECT * FROM myview WHERE last_name LIKE '%sun%';

//example 2
CREATE VIEW myview2
AS
SELECT AVG(salary) ag, department_id
FROM employees
GROUP BY department_id;

SELECT myview2.ag, g.grade_level
FROM myview2
JOIN job_grades g
ON myview2.ag BETWEEN g.lowest_sal AND g.highest_sal;

~~~

#### modify view
~~~
CREATE OR REPLACE VIEW myv3
AS
SELECT AVG(salary), job_id
FROM employees
GROUP BY job_id;

ALTER VIEW myv3
AS
SELECT * FROM employees;
~~~
#### delete view
~~~
DROP VIEW myv1, myv2, myv3,

DESC myv3

truncate does not support rollback
~~~
### Variables
~~~
//system variables
SHOW GLOBAL | SESSION VARIABLES like '%char%';
select @@gloabal|session .varaible(autocommit)
set @@global.autocommit = 0;

DECLARE m INT DEFAULT 1

SET m=2

SELECT m
~~~
### Save Process(group)
~~~
//syntax, arguments should have pattern(IN|OUT|INOUT), paramter_name, parameter_type
CREATE PROCEDURE save_process_name (arguments)
BEGIN

END

CALL save_process_name(arguments)

//example
SELECT * FROM admin;

DELIMITER $
CREATE PROCEDURE myp1()
BEGIN
    INSERT INTO admin(username, password)
    VALUES('john', '0000'),('rose', '0000'),('jack', '0000'),('tom', '0000')
END $

CALL myp1()$

SELECT * FROM admin$

//check username and password
CREATE PROCEDURE myp2(IN username VARCHAR(20), IN password VARCHAR(20))
BEGIN
    DECLARE result INT DEFAULT 0; //initialize variable

    SELECT COUNT(*) INTO result //pass the value
    FROM admin
    WHERE admin.username = username
    AND admin.password = password;

    SELECT IF(result > 0, 'success', 'fail') //use the variable
END $

CALL myp2('slogan', '123466')$
~~~
#### process in & out
~~~
CREATE PROCEDURE myp3(IN beautyname VARCHAR(20), OUT boyname VARCHAR(20), OUT userCP INT)
BEGIN
    SELECT bo.boyName, bo.userCP INTO boyname, userCP
    FROM boys bo
    INNER JOIN beauty b
    ON bo.id = b.boyfriend_id
    WHERE b.name = beautyname;
END $

CALL myp3('slogan', @bName, @usercp)$
SELECT @bName,@usercp $


CREATE PROCEDURE myp4(INOUT a INT, INOUT b INT)
BEGIN
    SET a=a*2
    SET b=b*2
END $

SET @m=10
SET @n=20
CALL myp8(@m,@n)$
SELECT @m,@n$
~~~
#### drop and check procedure
~~~
DROP PROCEDURE p1

SHOW CREATE PROCEDURE myp1;

CREATE PROCEDURE test_p5(IN beautyname VARCHAR(20), OUT str VARCHAR(30))
BEGIN
    SELECT CONCAT(beautyname, 'and', IFNULL(boyname, 'null')) INTO str
    FROM boys bo
    RIGHT JOIN beauty b
    ON b.boyfriend_id = bo.id
    WHERE b.name=beautyname
END $

CALL test_p5('sunminjuan', @str)$
SELECT @str$
~~~

### Functions
~~~
//syntax
CREATE FUNCTION function_name(arguments) RETURNS return_type
BEGIN
AND

//example
CREATE FUNCTION my_f1() RETURNS INT
BEGIN
    DECLARE c INT DEFAULT 0;
    SELECT COUNT(*) INTO c
    FROM employees;
    RETURN c;
END $

SELECT my_f1()$

//example2
CREATE FUNCTION my_f2(deptName VARCHAR(20)) RETURNS DOUBLE
BEGIN
    DECLARE @sal=0;
    SELECT AVG(salary) INTO @sal
    FROM employees e
    JOIN departments d
    ON e.department_id = d.departemnt_id
    WHERE d.department_name = deptName;
    RETURN @sal
END $

SELECT my_f2('IT')$

SHOW CREATE FUNCTION my_f2
DROP FUNCTION my_f2
~~~
### Conditoinal Process & Function
~~~
CREATE PROCEDURE test_case(IN score INT)
BEGIN
    CASE
    WHEN score>=90 AND score<=100 THEN SELECT 'A';
    WHEN score>=80 THEN SELECT 'B';
    WHEN score>=70 THEN SELECT 'c';
    ELSE SELECT 'D';
    END CASE;
END $

CALL test_case(88)$

//if example
CREATE FUNCTION test_if(score INT) RETURNS CHAR
BEGIN
    IF score>=90 AND score<=100 THEN RETURN 'A';
    ELSEIF score>=80 THEN RETURN 'B';
    ELSE score>=70 THEN RETURN 'C';
    ELSE RETURN 'D';
    END IF;
END$

SELECT test_if(88)

//iterator
CREATE PROCEDURE pro_while(IN insertCount INT)
BEGIN
    DECLARE i INT DEFAULT 1;
    a:WHILE i<insertCount DO
        INSERT INTO admin(username, password) VALUES (CONCAT('rose',i), '777');
        IF i>=20 THEN LEAVE a;
        END IF;
        SET i=i+1;
    END WHILE a;
END

CALL pro_while(20)$;

~~~
## Advanced SQL
~~~
~~~