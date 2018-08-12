### git使用流程（如果有些步骤已经做过了，可以跳过）

#### 1. 在自己本地安装git client（详细步骤可自行百度）

#### 2. 安装完成之后，设置全局的用户名和邮箱：
git config --global user.name "name"  		//设置用户名  
git config --global user.email "email" 		//设置邮箱

#### 3. clone github上的远程仓库aliydd：
git clone git@github.com:DDTeam4/aliydd.git
##### 如果提示你没有权限clone该仓库，则执行步骤4

#### 4. 配置SSH Key
ssh-keygen -t rsa -C "youremail"
##### 之后一路确认（使用默认即可）
记事本打开/C/Users/your name/.ssh/下id_rsa.pub文件，复制该段信息；登录github账户，点击头像进入Settings -> SSH and GPG keys -> New SSH key，将复制的信息粘贴到该处

#### 5. 详细的git命令，可以参考http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html
##### 但要注意几点：
	a 本地仓库的代码修改测试完成后多多commit
	b 在将代码push到远程仓库时，一定要确保做过初步的测试，是可以运行的代码，在push之前，一定先把远端的代码先pull下来
	c 如果自己的代码改动较多，且有别于主分支的其他特性，最好自己创建新的分支，最后合并分支即可

