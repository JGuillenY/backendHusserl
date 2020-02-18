<?php
/*
* This is the "main" class of the menuSite library Its based on the package phpmenu and cake
* So this package is made by various contributors but put together by secureNet via this package
* @author Original  http://www.marcopratesi.it/ (C) 2001-2004 Marco Pratesi  Extended by SecureNet 
* @package snfm
* @subpackage snfm.libs
* @filesource
*/


/**
 * Object menuSite, parent class of the whole framework.
 *
 * @package snfm
 * 
 */
class menuSite{
	/**
	* The "libjs" directory of the package
	* @access private
	* @var string
	*/
	var $libjsdir;

	/**
	* The "themesdor" directory of the package
	* @access private
	* @var string
	*/
	var $themesdir;

	/**
	* The "libjsurl" url for the javascript libraries
	* @access private
	* @var string
	*/
	var $libjsurl;
	/**
	* The "menulibs" directory of the package
	* @access private
	* @var string
	*/
	var $menulibs;
	/**
	* The menuString variable, to generate menus on the fly 
	* @access private
	* @var string
	*/
	var $menuString;
	/**
	* The config variable, to access global variables
	* @access private
	* @var string
	*/
	var $configs;
	/**
        * The themesdir directory of the themes
        * @access private
        * @var string
        */
	var $themes;
	/* The constructor method; it initializates the menuSite
	* @return void
	*/
	function menuSite(){
		//$this->configs = get_class_vars('MAIN_CONFIG');
		$this->themesdir = URL.'libs/themes/';
		$this->libjsurl = URL.'libs/menulibs/libjs/';
		$this->menulibs = './libs/menulibs/';
		$this->libjsdir = 'libs/menulibs/libjs/';
		$this->menuString ="";
	}
	/*
	* This method returns a full url based on the site base url.
	* @return string
	* @access public
	*/
	function createUrl($complement){
		return $this->configs['superglobals']['baseurl'].$complement;
	}
	/*
	* This method returns a full url based on the site base url.
	* @return string
	* @access public
	*/
	function menuLink($complement){
		return URL."index.php?action=$complement";
		#return $this->configs['superglobals']['baseurl'].$complement;
	}
	
	/* The method creates the three menu
	* @access private
	* @return void
	*/
	function createTreeMenu(){
		require_once ROOT."$this->menulibs".'PHPLIB.php';
		require_once ROOT."$this->menulibs".'layersmenu-common.inc.php';
		require_once ROOT."$this->menulibs".'treemenu.inc.php';
		$menu = new TreeMenu();
		$menu->setMenuStructureString($this->menuString);
		$menu->setIconsize(16, 16);
		$menu->parseStructureForMenu('treemenu1');
		$menu->setSelectedItemByUrl('treemenu1', basename(__FILE__));
		print $menu->newTreeMenu('treemenu1');
	}
	/* Here is an inline example:
     	 * <code>
     	 * <?php
	 * $test = new menuSite();
     	 * $test->addNode(1,"mi primera prueba","http://www.w3c.org","a very simple test","linux.png");
     	 * ?>
     	 * </code>
	 * @example
	 * @param integer $level
	 * @param mixed $level_desc node level in the menu
	 * @param string $titulo
	 * @param mixed $titulo_desc title level
	 * @param string $URL
	 * @param mixed $URL_desc url that would be called
	 * @param string $popup
	 * @param mixed $popup_desc popup message
	 * @param string $icon
	 * @param mixed $icon_desc description of the icon
	 * @access public
	 * @return void
	 */
	function addNode($level,$titulo,$URL="",$popup="",$icon=""){
		for($i=1;$i<=$level;$i++){
			$this->menuString.=".";
		}
		$this->menuString.="|$titulo|$URL|$popup|$icon|\n";
	}
	/**
	* The method prints the baseHeaders
	*This means:Stylesheets, pagelogos, detects the browser
	* @access public
	* @return void
	*/
	function baseHeader($siteLogo="",$baseCss="default",$pageTitle="",$scripts="",$target=""){
		?>
		<html>
		<?
		if($target) echo "<base target=main>";
		?>
		<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"></meta>
		<?
		if($scripts){
			foreach ($scripts as $value){
				echo $value;
			}
		}
		?>	
		<link rel="stylesheet" href="<?echo $this->themesdir.$baseCss;?>.css" type="text/css"></link>
		<link rel="shortcut icon" href="<?echo $this->configs['superglobals']['baseurl']."img/".$siteLogo;?>"></link>
		<title><?echo ("$pageTitle");?></title>
		<script language="JavaScript" type="text/javascript">
		<?php require_once $this->libjsdir.'layersmenu-browser_detection.js';?>
		</script>
		<script language="JavaScript" type="text/javascript" src="<?echo "$this->libjsurl".'layerstreemenu-cookies.js';?>">
		</script>
	
		</head>
		<?
	}
	/**
	* The method prints the baseFooter
	*This means: Close the page, right place to add copyright and such info.
	* @access public
	* @return void
	*/
	function baseFooter(){
		?>	</div></div>
			</td></tr>
			</table></body>	</html>
		<?
	}
	/**
	* The method prints the basepage. 
	*This means: calls header and footer and prints menus and contents.
	* @param string $appTitle (title for the aplication)
	* @param string $nav 
	* @access public
	* @return void
	*/
	function baseBody($appTitle="",$nav=""){
		GLOBAL $DIVWIDTH,$DIVTITLE,$MENUFOOTER;
		?>
			<body <?echo BGIMAGE;?>>
					
			<table width="100%" border="0" cellpadding="0" cellspacing="0">
			<tr><td width="<?echo ("$DIVWIDTH");?>" valign=top>
			<table ><tr><td><div class="normalbox">
			<?echo "<div style=\"$DIVTITLE\">$appTitle</div><hr style=\"border: solid 1px #008800;\">";?>				
				<div class="normal"><?echo $nav;?>
				</div>
					<?$this->createTreeMenu();
					  echo $MENUFOOTER;?>
				</div>
				<br>
			</td></tr>
			</table>
			</td><td valign="top">
			<div class="normalbox">
				<div class="normal">
		<?
	}

	/**
	* The method prints the menu in the left Frame. 
        * @$menuTitle title of the current window.
	* @access public
	* @return void
	*/
	function frameMenu($menuTitle=""){
		echo "<body ".BGIMAGE.">";
		echo "<div class=\"menubox\">";
		echo "<div class=\"normal\">$menuTitle</div>";
		$this->createTreeMenu();
	}

	/**
	* The method prints the main page
	* @access public
	* @return void
	*/
	function frameBody(){
//		echo "<body><div class=\"normalbox\">";
//		echo "<div class=\"normal\">$Title</div>";
		echo "<body ".BGIMAGE."><table width=98% class=\"normalbox\"><tr><td>\n";
	}
		/**
	* The method prints the frame footers closing the site made with frames. 
	* @access public
	* @return void
	*/
	function frameFooter(){
		?>
		</div></td></tr></table></body></html>
		<?
	}
	/**
	* The method prints the frames for the frame site
	* uses goblal variables $URL, $leftFrame (for size) and $bSize for left border size
	* @param $appTitle title of the application to be displayed
	* @access public
	* @return void
	*/
	function baseFrames($appTitle=""){
		global $URL, $leftFrame, $bSize;
		if(!($leftFrame))$leftFrame=320;
		if(!($bSize))$borderSize=1;
		?><html>
			<head>
				<title><?echo $appTitle;?></title>
			</head>
			<frameset  rows="70,*">
			   <frame frameborder=0 border=0 framespacing=2 name="banner" noresize scrolling=no src="<?echo $URL."frames/header.php";?>">
			   <frameset  cols="<?echo $leftFrame;?>,*">
			      <frame name="contents" frameborder=0 border=0 framespacing=2 bordercolor="#00DD00" scrolling="auto" target="main" src="<?echo $URL."frames/menu.php";?>"> 
			      <frame name="main" frameborder=0 border=0 framespacing=2 src="<? echo $URL."frames/body.php";?>">
			   </frameset>
			   <noframes>
			      <body  <?echo BGIMAGE;?>>
			 	<p>Esta p&aacute;gina usa frames, pero tu browser no las sopporta. </p>
			      </body>
			   </noframes>
			</frameset>
		</html><?

	}

}	
	

