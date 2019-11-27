## BES installation

1. Download the RPM packages found (see above) for your target operating system.
1. Use yum to install the libdap and bes RPMs: `sudo yum install libdap-3.20.*.rpm bes-3.20.*.rpm`. (Unless you're going to be building software from source for Hyrax, skip the *-devel and *-debuginfo RPMs.)
1. Look at the /etc/bes/bes.conf.rpmnew file. Localize and merge the new BES.ServerAdministrator information into your bes.conf file. Note the format of the new BES.ServerAdministrator entries as it has changed from the previous version.
1. At this point you can test the BES by typing the following into a terminal:

* Start it: `sudo service besd start`
* Connect using a simple client: `bescmdln`
* Get version information: `show version`
* exit from bescmdln: `exit`

BES Notes - If you are upgrading from an existing installation older than 1.13.0

* In the bes.conf file the keys BES.CacheDir, BES.CacheSize, and BES.CachePrefix have been replaced with BES.UncompressCache.dir, BES.UncompressCache.size, and BES.UncompressCache.prefix respectively. Other changes include the gateway cache configuration (gateway.conf) which now uses the keys Gateway.Cache.dir, Gateway.Cache.size, and Gateway.Cache.prefix to configure its cache. Changing the names enabled the BES to use separate parameters for each of its several caches, which fixes the problem of 'cache collisions.'

## OLFS and Starting the Server

### CentOS 7, modern Ubuntu/Debian systems:

Install tomcat (sudo yum install tomcat)

1. Make the directory /etc/olfs and ensure tomcat can write to it. (sudo mkdir /etc/olfs; chgrp tomcat /etc/olfs; chmod g+w /etc/olfs)
1. Unpack the opendap.war web archive file from olfs-1.18.1-webapp.tgz (tar -xzf olfs-1.18.1-webapp.tgz)
1. Install the opendap.war file (sudo cp opendap.war /usr/share/tomcat/webaps)

NOTE: On the current CentOS-7 default SELinux rules will now prohibit Tomcat from reading the war file. This can be remediated by issuing the following two commands as the super user:

    sudo semanage fcontext -a -t tomcat_var_lib_t /var/lib/tomcat/webapps/opendap.war
    sudo restorecon -rv /var/lib/tomcat/webapps/

Start tomcat: 
    
    sudo service tomcat start

### CentOS 6 (Older Systems)

1. Check the java version on your system: (java -version)
2. You need at least java 7 (aka 1.7.0), although Java 8 is better.

    * If you need to update java, the easiest way on Linux is using yum or apt-get
    * On CentOS Linux you may need to use the alternatives tool to set the Java version: alternatives --config java
3. Use yum to install tomcat.noarch. (sudo yum install tomcat) 
3. On CentOS 6, you will need to first install the EPEL info for yum. To do that...
    * [`yum install`](https://dl.fedoraproject.org/pub/epel/epel-release-latest-6.noarch.rpm). 
    * See [fedoraproject.org](https://fedoraproject.org/wiki/EPEL) for more info)
3. On CentOS 6, you may need to open a port in the iptables-managed firewall. To do that...
    * Example, open port 8080: `sudo iptables -I 1 -i eth0 -p tcp --dport 8080 -j ACCEPT`
1. Now follow the CentOS 7 steps (but skip the SELinux bits as they probably do not apply).

## Test the Server

In a web browser, use `http://localhost:8080/opendap/`
Look at sample data files shipped with the server

## Notes:

* If you are installing the OLFS in conjunction with ncWMS2 version 2.0 or higher: Copy both the opendap.war and the ncWMS2.war files into the Tomcat webapps directory. (Re)Start Tomcat. Go read about, and then configure ncWMS2 and the OLFS to work together.
* From here, or if you are having problems, see our new Hyrax Manual and the older Hyrax documentation page
* ATTENTION - If you are upgrading Hyrax from any previous installation older than 1.15, read this!
* The internal format of the olfs.xml file has been revised. No previous version off this file will work with Hyrax-1.15. In order to upgrade your system, move your old configuration directory aside (ex: `mv /etc/olfs ~/olfs-OLD`) and then follow the instruction to install a new OLFS. Once you have it installed and running you will need to review your old configuration and make the appropriate changes to the new olfs.xml to restore your server's behavior. The other OLFS configuration files have not undergone any structural changes and you may simply replace the new ones that were installed with copies of your previously working ones.
* To make the server restart when the host boots, use systemctl enable besd and systemctl enable tomcat or chkconfig besd on and chkconfig tomcat on depending on specifics of your Linux distribution