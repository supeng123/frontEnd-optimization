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
FROM employees

SELECT salary AS originMoney, department_id,
CASE
WHEN salary> 20000 THEN 'A'
WHEN salary> 15000 THEN 'B'
WHEN salary> 10000 THEN 'C'
ELSE 'D'
END AS level
FROM employees

~~~ 
### Group Functions
~~~
SELECT SUM(salary) FROM employees;
SELECT AVG(salary) FROM employees;
SELECT MIN(salary) FROM employees;
SELECT MAX(salary) FROM employees;
SELECT COUNT(salary) FROM employees;
~~~