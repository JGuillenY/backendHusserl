<?
/**
* This helper is the main class of the Zirion Diccionary
* @package snfm
* @subpackage snfm.main
* @Author SecureNet development Team
*/
class EsIndice  extends helperController {

	var $next;
	var $letter;
	var $previous;
	
	function index(){
		$this->validateGets();
		require_once  APPLIBSROOT."lang.php";
		$this->tab=0;
		$this->scripts[]=$this->dhtml->permitContractibleHeaders();
		$this->scripts[]=$this->dhtml->permitConfirmSubmit();
		$this->controller="EsIndice";
		$this->lang="es";
		$this->trans="de";
		$this->text=$LANG[$this->lang];
		$this->urlStack();
		$this->ifFrameExec();
		
	}
	
	function tabs0Form(){
		if(!($this->letter))$this->letter="a";
		$query="select * from termino where
			(t_term_es like '".$this->letter."%') order by t_term_es limit ".$this->next.",25";
		$this->fetch("$query");	
		$this->tab=0;
	}

	function urlStack(){
		$url=$this->html->base."index.php?";
		foreach ($_SERVER['argv'] as $value) $url.=$value;
		if ($_SESSION['previous']){
			if(!(in_array($url,$_SESSION['previous']))){
				$_SESSION['previous'][]=$url;
			}		
			else{
				$key = array_search($url, $_SESSION['previous']);  
				$_SESSION['previous'] = array_slice($_SESSION['previous'], 0, $key+1);
			}
			$size=count($_SESSION['previous']);
			$this->previous=$_SESSION['previous'][$size-2];
		}
		else {
			$_SESSION['previous'][]=$url;
			$size=count($_SESSION['previous']);
			$this->previous=$_SESSION['previous'][$size-2];
		}
	}

	function ifFrameExec(){
		if (!($_GET['exec'])){
			$_SESSION['previous']=NULL;
			if(!($_GET['next'])){
				$_SESSION['next']=0;
				$this->next=0;
			}
			else{
				$this->next=$_SESSION['next']+$_GET['next'];				
				$_SESSION['next']=$_SESSION['next']+$_GET['next'];
			}
			if($_GET['letter']){
				$_SESSION['letter']=$_GET['letter'];
				$this->letter=$_GET['letter'];
			}
			else{
				$this->letter=$_SESSION['letter'];
			}
		
		}

	}
}

?>
