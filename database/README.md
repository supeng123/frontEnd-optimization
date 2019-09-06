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