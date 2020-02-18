<?
/**
* This helper is the main class of the INE Cambio climatologico
* @package snfm
* @subpackage snfm.main
* @Author SecureNet development Team
*/
class DeBusqueda  extends helperController {

	var $search;
	var $next;
	var $letter;
	var $previous;

	function index(){
		$this->validateGets();		
		require_once  APPLIBSROOT."lang.php";
		$this->scripts[]=$this->dhtml->permitContractibleHeaders();
		$this->scripts[]=$this->dhtml->permitConfirmSubmit();
		$this->controller="DeBusqueda";
		$this->lang="de";
		$this->trans="es";
		$this->text=$LANG[$this->lang];
		$this->urlStack();
		$this->ifFrameExec();
		$this->search=false;
		if(!(isset($this->data['palabra'][0])))$this->data['palabra'][0]=$_GET['word'];
	}

	function searchForm(){
		if(!(isset($this->data['palabra'][0])))$query="select t_term_de,t_term_es,t_id from termino where t_term_de = ''";
		else{
			$query="select t_term_de,t_term_es,t_id from termino where
				(t_term_de like '".$this->data['palabra'][0]."%') order by t_term_de limit ".$this->next.",25";
		}
		$this->fetch("$query");
		$this->search=true;
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
		}
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

	
}

?>
