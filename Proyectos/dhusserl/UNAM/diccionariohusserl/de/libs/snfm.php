<?
/**
 * Root SNFM functionalities.
 *
 * @filesource
 * @author SecureNet Developers
 * @link https://securenet.com.mx
 * @originaly by: Cake Developers
 * @package snfm
 * @lastmodified $Date: 
 * @original license http://www.opensource.org/licenses/mit-license.php The MIT License
 *
 */


/**
 * Object snfm, parent class of the whole framework.
 *
 * @package snfm
 * 
 */
class snfm{
	/**
        * Database connection, if available.
        * @access private
        * @var adodb
        */
	var $db=NULL;
	
	
	/**
        * HTML helper objetct.
        * @access public
        * @var html
        */
	var $html=NULL;
	
	/**
        * DHTML helper objetct.
        * @access public
        * @var dhtml
        */
	
	var $dhtml=NULL;

	/**
        * ACL helper object
        * @access public
        * @var dhtml
        */
	
	var $acl=NULL;
	
	/**
        * html headers scripts
        * @access private
        * @var array
        */
	var $scripts=array();

	/**
        * Main data array, used to send messages between controllers and views
        * @access public
        * @var array
        */
	var $data=array();
	
	/**
        * Main constructor.
        * Initializes html and db, sets $_POST to $this-data. VERY  IMPORTANT
	* @access private
        * @param string $controller controller name to be used during this instance.
        * @return void
        */
	function snfm($controller){
		global $URL;
		$this->html=new htmlAssistant($controller);
		$this->acl=new aclAssistant($controller);
		$this->data=$_POST['data'];
		$this->db=new snfmModel();
		$this->dhtml=new dynamicHtmlAssistant();
	}

	/**
        * Api for setting messages.
	* @acess public
        * @param string $algo variable to be set in data['message'].
        * @return void
        */
	function setData($algo=NULL){
                $this->data['message']=$algo;
        }
	
	/**
        * Api for launching view.
	* @access public
        * @param string $view name of the view to be laucnhed
        * @return void
        */
	function launchPage($view=NULL){
                require_once $view;
        }
	/**
        * Api for starting sessions.
	* @access public
        * @return void
        */
	function startSession(){
		session_start();
	}

	
}
?>
