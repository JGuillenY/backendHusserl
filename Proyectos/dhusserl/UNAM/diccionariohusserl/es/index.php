<?
/*
* This index.php file. controlls the whole framework. Makes all objects, calls controllers, etc.
* @package snfm
* @subpackage snfm.main
* @Author SecureNet development Team
*/


//NO HACER CAMBIOS DESPUES DE ESTA SECCION
require 'configs/config.php';
require 'libs/core.php';
require 'app/applibs/menuBase.php';
require 'app/helpers/helperModel.php';
require 'app/helpers/helperController.php';

define ('DS', DIRECTORY_SEPARATOR);


/*
*This index class, catches all post and gets and runs the proper controler based on it.
*@package snfm 
*@subpackage snfm.main
*@Author SecureNet development Team
*
*
*/
class index{
	
	/*
	*@access private
	*@var object
	*/
	var $menuObj;
	
	/*
	*@access private
	*@var string
	*/		
	
	var $title;
        /*
        *@access private
        *@var string
        */

	var $icon;
        /*
        *@access private
        *@var string
        */
	
	var $theme;
        /*
        *@access private
        *@var string
        */
	var $scripts;

        /*
        *@access private
        *@var string
        */
	var $tmpOjb;
        
	/*
        *@access private
        *@var string
        */
	var $modelObj;
		
        /**
        * Constructor for the index page
        * @access public
        * @param string $TITULO title of the page
	* @param string $ICONO icon of the page
	* @param string $TEMA name of the theme file located in libs/themes
	* @param array $SCRIPTS scripts to be initialized when every page is loaded
        * @return void
        */
	function index($TITULO,$ICONO,$TEMA,$SCRIPTS){
		$this->title=$TITULO;
		$this->icon=$ICONO;
		$this->theme=$TEMA;
		$this->scripts=$SCRIPTS;
		$this->menuObj=baseMenu();
		
	}

	/**
        * Prints headers.
        * @access private
        * @return void
	*/
	function printHeader(){
		$this->menuObj->baseHeader($this->icon,$this->theme,$this->title,$this->scripts);
	}
	

        /**
        * Prints footers
        * @access private
        * @return void
        */
	function printFooter(){
		$this->menuObj->baseFooter();
	}
	
	/**
	* Prints body.
	* @access private
	* @return void
	*/
	function printBody($functionName){
		$this->menuObj->baseBody($this->title);
	}
        
	/**
	* Evaluates which controller to call.
	* @access public
	* @return void
	*/
    function evalAction($action=NULL){
        if(!($action)){
    		if(!($_SESSION['ACCESS'])) header('Location: '.URL.'?action=siteaccess');
			$this->printHeader();
			$this->printBody("Principal");
			require_once "app/views/body.php";
			$this->printFooter();
		}
		else{
			if ($this->secureScripts("$action"."Controller.php","controllers")){
				require_once "app/controllers/$action"."Controller.php";
			}
			else $this->secureMsgError();
			$this->tmpobj=new $action($action);
			$this->tmpobj->index();
			if(($_GET['ESCAPE']) or ($this->tmpobj->escape)){
				if($this->tmpobj->scripts)$this->appendScripts();
				$this->printHeader();
				echo "<body>";
				if($_POST[$action]){
					$exec=$_POST[$action]."Form";
					$this->tmpobj->$exec();
				}
				if ($this->secureScripts("$action".".php","views")){
					$this->tmpobj->launchPage("app/views/$action.php");
					$this->printFooter();
				}
				else $this->secureMsgError();
			}
			elseif(($_GET['LOGINPROC']) or ($this->tmpobj->logproc)){
				if($this->tmpobj->scripts)$this->appendScripts();
				//$this->printHeader();
				//echo "<body>";
				if($_POST[$action]){
					$exec=$_POST[$action]."Form";
					$this->tmpobj->$exec();
				}
				if ($this->secureScripts("$action".".php","views")){
					$this->tmpobj->launchPage("app/views/$action.php");
					//$this->printFooter();
				}
				else $this->secureMsgError();
			}
			else{
				if($this->tmpobj->scripts)$this->appendScripts();
				
				if($_POST[$action]){
					$exec=$_POST[$action]."Form";
					$this->tmpobj->$exec();
				}
				$this->printHeader();
				$this->printBody($action);
				$this->tmpobj->launchPage("app/views/$action.php");		
				$this->printFooter();
			}
			$this->tmpobj->db->closeDB();
			$this->tmpobj=NULL;
		}
        }

	/**
	* Appends javascripts to be initialized in the page
	* @access private
	* @return void
	*/
	function appendScripts(){
		$this->scripts=array_merge($this->scripts, $this->tmpobj->scripts);
	}

	/**
	* Check if a page or script to be open, actually exists where is supposed to:
	* @access private
	* @param $page =name of page to be opened
	* @return bool
	*/
	function secureScripts($page,$dirname){
		$dir = "app/$dirname/";
		if (is_dir($dir)) {
			if ($dh = opendir($dir)) {
				while (($file = readdir($dh)) !== false) if(!(($file==".")or($file==".."))) $valid_pages[$file]="";
				closedir($dh);
			}
		}
		else return false;
		if (!isset($valid_pages[$page]))return false;
		else return true;
	}

	/**
	* Prints an unauthorized file access error kills execution
	* @access private
	* @return VOID
	*/
	function secureMsgError(){
		echo "<font color=red>";
		echo "Error ():<strong> Unauthorized File Access</strong><br><br>The following info has been logged:<br><br>";
		echo "<table border=\"0\" width=\"60%\" cellpadding=\"1\" cellspacing=\"1\"";
		echo "<tr><td>Request Method: ".$_SERVER['REQUEST_METHOD']."</td></tr>";
		echo "<tr><td>Time: ".date('Y-m-d -- g:i:s')."</td></tr>";
		echo "<tr><td>Query String: ".$_SERVER['QUERY_STRING']."</td></tr>";
		echo "<tr><td>UA: ".$_SERVER['HTTP_USER_AGENT']."</td></tr>";
		echo "<tr><td>IP: ".$_SERVER['REMOTE_ADDR']."</td></tr>";
		echo "<tr><td>PORT: ".$_SERVER['REMOTE_PORT']."</td></tr>";
		echo "</table></font>";
		die;
	}
}
/*
* In case the framework is called with frames. 
* this class catches all post and gets and decides which controller to run
*@package snfm
*@subpackage snfm.main
*/
class indexFrames extends index{

        /*
	 *@access private
	 *@var string
	*/
	var $body;

	/*
	*@access private
	*@var string
	*/
	var $frame;
        
	/**
        * Constructor for the index with framespage
        * @access public
        * @param string $TITULO title of the page
        * @param string $ICONO icon of the page
        * @param string $TEMA name of the theme file located in libs/themes
        * @param array $SCRIPTS scripts to be initialized when every page is loaded
        * @return void
        */
	function indexFrames($TITULO,$ICONO,$TEMA,$SCRIPTS){
		$this->title=$TITULO;
		$this->icon=$ICONO;
		$this->theme=$TEMA;
		$this->scripts=$SCRIPTS;	
		$this->frame=1;
		$this->menuObj=baseMenu();
	}

	/**
	* Prints Frames.
	* @access private
	* @return void
	*/	
	function printFrames(){
		$this->menuObj->baseFrames($this->title);
	}
	
	/**
	* Prints body of frame.
	* @access private
	* @return void
	*/
	function printBody($functionName){
		$tmp="<font color='red'>$functionName</font>";
		if($this->body){
			$this->menuObj->frameBody($this->title);
		}
		else $this->menuObj->frameMenu($this->title);
	}
	
	/**
	* Prints Headers of whole Frames.
	* @access private
	* @return void
	*/
	function printHeader(){
		$this->menuObj->baseHeader($this->icon,$this->theme,$this->title,$this->scripts,$this->frame);
	}
	
	/**
	* Prints footers of frame.
	* @access private
	* @return void
	*/
	
	function printFooter(){
		$this->menuObj->frameFooter();
	}

	/**
	* Evaluates which controller to call.
	* @access public
	* @return void
	*/
	function evalFramesAction($action=NULL){
		switch ($action){
			case "menu":
				$this->printHeader();
				$this->printBody("prueba");
				break;
			case "header":
				$this->body=1;
				$this->showFrame("header");
				break;
			case "body":
				$this->body=1;
				$this->showFrame("body");
				//$this->evalaction("body");
				break;
			case "":
				$this->printFrames();
			default:
				$this->body=1;
				$this->evalAction($action);
		}
	}
	function showFrame($action){
		require_once "app/controllers/".$action."Controller.php";
		$this->tmpobj=new $action($action);
		$this->tmpobj->index();
		if($_POST[$action]){
			$exec=$_POST[$action]."Form";
			$this->tmpobj->$exec();
		}
		$this->tmpobj->launchPage("app/views/".$action.".php");		
		$this->tmpobj->db->closeDB();
		$this->tmpobj=NULL;
	}
}
session_name("snfm5434534");
session_start();


if($ACL==1){
	if($_GET['check']=="acl") echo "access to the system";
	else{
		$acl=new aclAssistant();
		$acl->displayHeaders();
		$acl->displayLoginPage("Login!!","?check=acl");
		$acl->displayFooters();
	}
}
else{
	global $TITLE,$ICON,$THEME,$SCRIPTS;
	if($FRAMES){
		$index=new indexFrames($TITLE,$ICON,$THEME,$SCRIPTS);
		$index->evalFramesAction($_GET['action']);
		$index=NULL;
	}
	else{
		$index=new index($TITLE,$ICON,$THEME,$SCRIPTS);
		$index->evalAction($_GET['action']);
		$index=NULL;
	}
}
?>
