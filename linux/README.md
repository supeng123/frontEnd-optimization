## Command Format
~~~
COMMAND[- OPTIONS] [arguments]
ls -ald
-h *total size
-d *directory
-l *list
-a *all
-i *id

l|d|-
link|directory|file

x|r|w
execute|read|write

u|g|o
user|group|other
~~~
### mkdir(make directory) && rmdir(remove empty directory)
~~~
*-p iteratable
~~~
### cp
~~~
*-r copy the whole direcory
*-p save the directoy original information,like the time of creation
cp /tmp/slogan/text.txt /home/slogan/result.txt
~~~
### mv
~~~
mv /tmp/slogan/text.txt /home/slogan/result.txt
mv /tmp/slogan /home/suminjuan
~~~
### rm
~~~
*-r directoy
*-f force
~~~
### cat && more && less && head && tail
~~~
check the file content
*-n with the number

less /service (with n check all service marked places)
~~~
### ln
~~~
*-s soft link
in -s /etc/issue /tmp/issue.soft
~~~
## File Jurisdiction

### chmod
~~~
//syntax
chmod [{ugoa}{+-=}{r(4)|w(2)|x(1)}][mode]
*-R iterable

//add exector right to one file
chmod u+x lovestory.txt
chmod 100 lovestory.txt

//add write right to group and remove read right to other
chmod g+w, o-r lovestory.txt
chmod 024 lovestory.txt

//use = regardless the file's previous rights
chmod g=rwx lovestory.txt
chmod 070 -R lovestory

//other user can delete the file if its parent directory has write right
even if the file only has read right
~~~
### chown
~~~
//only root user can use chown
chown root /home/lina/love.txt

//add user
useradd supeng
chown supeng /home/lina/love.txt
~~~
### chgrp
~~~
//add group
groupadd lampbrother

chgrp lampbrother fengjie

//check the file juridiction
umask -S
~~~
## Find
~~~
//syntax
* find [scope][condition]

//search files include name init in /etc by name
find /etc -name init
find /etc -name *init*
find /etc -name int???
find /etc -iname int???// capital iname

//search files size in /etc by size
find /etc -size 204800 //size is equal to 100m

//search files by owner
find /home -user supeng

//search files by group
find /home -group supeng

//search files by time
fint /etc -cmin(change property)|-mmin(modify content)|-amin(access) -|+5

//union search(-a(and)|-o(or))
fint /etc -size +163840 -a -size -204800

//by file type(d(directory)|f(file)|l(link))
find /etc -type d -a -type f

//check the find result
find /etc -name init -exec ls -l {}\;
find /etc -name init -ok ls -l {}\;

//by iname
find /etc -inum 31531 -exec rm -rf {}\;
~~~
### locate
~~~
//search named inittab files regradless its capital
locate -i inittab
//update files info
updatedb
~~~
### which && whereis
~~~
//find where the command is
which cp
whereis cp
~~~
### grep
~~~
//find the right row and column in file's content
grep -i multiuser /etc/inittab

//ignore the rows with #
grep -v ^# /etc/inittab
~~~
## Help
~~~
*man (manual)
//check the command specification
man cp

//check the config files should not include the abosulute directory of configuration file
man services
man 5 passwd
man 1 passwd

whatis for command
apropos for configuration file

help umask
~~~
## User Management
~~~
useradd supeng
passwd supeng ...

//check the remote login users
who|w (tty(local)|pts(other terminal))

//configuration files
//etc/passwd|etc/.shadow|etc/group
root:x:0:0:root: root/bash
username:password_mark:user_id(0 is root_user):user_group_id
* if you want to change user has root right, change user_id to zero

usradd -u 666 -G root,bin -c "test user" -d/liming -s/bin /bash
grep liming /etc/paswd
passwd liming 'password'
* -S  status, check the password status in .shadow
* -l  lock, lock user
* -u  unlock,

//change or delete user info and password
usermod -G root liming
chage -l
chage -d 0 linming //require user to change password the first time login

userdel -r liming

//switch user
su - root
su - slogan
env
~~~
## Compress and Uncompress
~~~
//compress or uncompress file
*gzip file_name
*gunzip file_name

//compress directory
tar -[c(bundle)|v(detail)|f(targetfile)|z(compress)][after_compress_name][need_compress_directory]
tar -zcf file_directory.tar directory
//uncompress directory
tar -zxvf file_directory.tar.gz

zip supeng.zip supeng
*-r directory
unzip supeng.zip
~~~
## Broadcase Info
~~~
wall message_info
write user_name message_info
mail user_name

last && lastlog check the user login info

netstat
*-t tcp
*-u udp
*l monitoring
*r router
*-n show ipaddress and port

<!-- traceroute -->
//mount hardware equipment to linux
1.check if blank directory been created
mkdir -p /mnt/cdrom
2.mount hardware to the directory
mount /dev/sr0 /mnt/cdrom

umount /mnt/cdrom
~~~
## ShutDown && Reboot
~~~
shutdown -h 20:30(now) //don't do it
poweroff

reboot
init 6

//check the running time level
runlevel

logout
~~~
## Editor Vim
~~~
//check the row number
:set nu && :set nonu

//first row and last row
gg & G

//specifc row number
: n

//head and tail of row
0 & $

//copy paster
yy && nyy (n represents how many rows)
dd && ndd
p && P

CTRL+U to remove one command

//search string
/string_you_want_to_find

//insert type AIO
aio|AIO
~~~
## RPM
~~~
//commands
rpm -ivh package_full_name
* -i install
* -v verbose check detail info
* -h hash    check progress
* -e erase  uninstall
* -U upgrade upgrade packages
--nodeps check dependencies

//search rpm
*-q query
*-i information of rpm
*-l list of directory
*-R check require packages
*-f (rpm -qf /var/pacakge_full_name) check the package from the directory
rpm -q httpd

//RPM verify
*-V verify
rpm -v package_name
~~~
## Yum
~~~
yum list

yum search package_name

yum -y install gcc

yum grouplist
~~~
## ACL
~~~
getfacl /project
setfacl -m du:user_name:rx -R file_name 
setfacl -m m:rx /project/
* -m modify
* u user
* m mask limit max right, even if the user has all the right
* -R recurisivly
* d default

//SetUID for binary files
chmod 4777 /project

//chattr change the attribute of the file or directory
lsattr
chattr 
* -i  files can't be modified
* -a  can only append content to file
~~~
## File System
~~~
//check the dirctory
df -h
//check the directory's files
du -sh /directory
//check the disk status
dumpe2fs /dev/sda3

//check the equipments that have been amountted
mount l

//system ext4 is default, iso9660 is light disk
mount [-t file_system][-l ]
*create empty mount directory: mkdir /mnt/cdrom/
*mount the light disk: mount -t iso9660 /dev/cdrom /mnt/cdrom/
*or other way mount the light disk: mount /dev/sr0 /mnt/cdrom/
*umount light disk: umount /mnt/cdrom

*mount uDisk: mount -t vfat /dev/sdb1 /mnt/usb/
fdisk -l

//to ensure has the right to execute the file
mount -o remount, exec /home

fdisk partprobe to create sections forcelly
formalize new section: mkfs -t ext4 /dev/sdb1

//automatically mount the new disk in
vi /etc/fstab
/dev/sdb1 /disk1 ext4 default 1 2
mount -a
~~~
## Shell Basic
### history 
~~~
*-c , clear the hitory commands
*-w, write all the cached history commands into .bash_history
vi /root/.bash_history
~~~
### alias
~~~
alias vi='vim'
alias
unlias

//modify system 
vi /root/.bashrc
~~~
### input && output
~~~
0|1|2(keyboard|screen|error)

//save the output to abc.log
ls >> abc.log
data > abc.log
//save the error to abc.log
lst 2>> abc.log
//concat the two commands into one
lst &>> abc.log
ls >> abc.log 2>> err.log

~~~
### multiple commands
~~~
;(sequence)|(and)&&|(or)||

//copy the dist
dd if='input_file_name' of='out_file_name' bs='byte_number' count='number_block'

./configure && make && make install
~~~
### pipe
~~~
output of command a is the input of command b
ll -a /etc | grep list
netstat -a | grep -i "established"
~~~
### wildcard
~~~
? any one
* any one or more
[] one of any word
[-]any one in the range
[^]not anyone

ls ?ld | grep -i
~~~
### customized variables
~~~
data=$(Date)
echo "$data"456
echo ${data}456

set | grep -i Date
unset data
~~~
### system variables
~~~
export variable_name

export $PATH

${10}
$* print all the arguments of commands as one
$@ all the arguments of commands
$# the number of all parameters

$? the return value of last command, 0 is right value
$$ the current process id
$! the last process id

//read
read
*-t save to file
*-s save to varibale
*-n recieve the number of options
read -t 30 -p "please input your name:" name.log
read -t 30 -s "please input your age:" age
echo -e "\n"
echo Age is $age

read -n -t 30 -p "please select your gender[M?/F]:" gender
echo -e "\n"
echo "sex is $gender"
~~~
### operators
~~~
aa=11
bb=22
echo $(expr $aa + $bb)
echo $(($aa+$bb))
declare -i cc=$aa+$bb

declare cc
~~~
