<?
/**
 * This helper is the main class of the INE Cambio climatologico
* @package snfm
* @subpackage snfm.main
* @Author SecureNet development Team
*/

class helperModel extends snfm{

	/*
	*@access public
	*@var array
	*/
	var $recordSet;
	
	/*
	*receives a query and executes it. Its saved in $this->recorSet
	*@access public
	*@param string $query query to be executed
	*@return void
	*/
	function fetch($query){
		$this->recordSet=$this->db->doQuery($query);
	}

	function localFetch($query){
		return $this->db->doQuery($query);
	}

	function isInTableTermRef($tr_id,$id){
		$query="select tr_termid,tr_refid from termino_referencia where tr_refid='$tr_id' and tr_termid='$id'";
		$set=$this->localFetch($query);	
		$line=$set->FetchRow();
		if($line['tr_termid']=="")return false;
		else return true;
	}

	function editItemsForm(){
					echo $this->html->print_r_html($_POST);
			die;
		if($this->acl->aclHasPermission()){
			if($_POST['del']){
				$url=$this->html->here;
				$query="DELETE termino from termino where t_id='".$this->data['editItem']['id']."'";
				$this->db->doQuery($query);
				$query="DELETE parentezco from parentezco where p_padre='".$this->data['editItem']['id']."'";
				$this->db->doQuery($query);
				$query="DELETE vertambien from vertambien where
					ver_a='".$this->data['editItem']['id']."' 
					or ver_b='".$this->data['editItem']['id']."'";
				$this->db->doQuery($query);
				$query="delete from termino_referencia where 
					tr_termid='".$this->data['editItem']['id']."'"; 
				$this->db->doQuery($query);
				$text=$this->text['modification']."... <a href=\"$url\" target=\"_top\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			$url=$this->html->here."&ESCAPE=1&edit=1&exec=".$this->data['editItem']['id']."\n";
			if(!($this->html->validateErrors($this->data['editItem'],"cursde,curses"))){
				$text="Faltan Datos... <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			else{
				$query = "UPDATE termino SET t_term_es='".$this->data['editItem']['wordes']."',  
					t_term_de='".$this->data['editItem']['wordde']."',
					t_em_de='".$this->data['editItem']['cursde']."',
					t_em_es='".$this->data['editItem']['curses']."'
					WHERE t_id='".$this->data['editItem']['id']."' 'LIMIT 1'";
				if($this->db->doQuery($query))$text=$this->text['modification']."... <a href=\"$url\"=>Continuar</a>";
				else $text=$this->text['error']."... <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
		}
	}

	function addRefsForm(){
		if($this->acl->aclHasPermission()){
			$url=$this->html->here."&ESCAPE=1&edit=1&exec=".$this->data['AddRefs']['id']."\n";
			if(!($this->html->validateErrors($this->data['AddRefs']))){
				if(($this->data['AddRefs']['ref_id'])and($this->data['AddRefs']['tr_order'])){
					if ($this->isInTableTermRef($this->data['AddRefs']['ref_id'],$this->data['AddRefs']['id'])){
						$text="Ya existe el dato <a href=\"$url\"=>Continuar</a>";
						$this->html->flashText($text);
						die;
					}
					$query="select ref_id from referencia where ref_id='".$this->data['AddRefs']['ref_id']."'";
					$set=$this->localFetch($query);
					$line=$set->FetchRow();
					if($line['ref_id'] == $this->data['AddRefs']['ref_id']){
						$query="INSERT INTO termino_referencia (tr_termid,tr_refid,tr_order) values 
							('".$this->data['AddRefs']['id']."',
							 '".$this->data['AddRefs']['ref_id']."',
							 '".$this->data['AddRefs']['tr_order']."')";
						if((!$this->db->doQuery($query))){
							$text="Error num #arf01-01 <a href=\"$url\"=>Continuar</a>";
							$this->html->flashText($text);
						}
						else{
							$text=$this->text['modification']."... <a href=\"$url\"=>Continuar</a>";
							$this->html->flashText($text);
						}
					}
					else {
						$text="Faltan datos <a href=\"$url\"=>Continuar</a>";
						$this->html->flashText($text);
					}
				}
				$text="Faltan datos <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			else{	
				if ($this->isInTableTermRef($this->data['AddRefs']['ref_id'],$this->data['AddRefs']['id'])){
					$text="Ya existe el dato <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
					die;
				}
				$query="INSERT INTO termino_referencia (tr_termid,tr_refid,tr_order) values 
				('".$this->data['AddRefs']['id']."',
				 '".$this->data['AddRefs']['ref_id']."',
				 '".$this->data['AddRefs']['tr_order']."')";
				if((!$this->db->doQuery($query))){
					$text="Error num #arf01-01 <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
				}
				$query="INSERT INTO referencia (ref_id,ref_libro_de,ref_libro_es) values
					('".$this->data['AddRefs']['ref_id']."',
					 '".$this->data['AddRefs']['ref_libro_de']."',
					 '".$this->data['AddRefs']['ref_libro_es']."')";
				if((!$this->db->doQuery($query))){
					$text="Error num #arf01-02 <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
				}
				$text=$this->text['modification']."... <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
		}
	}

	function editRefsForm(){
		if($this->acl->aclHasPermission()){

			$url=$this->html->here."&ESCAPE=1&edit=1&exec=".$this->data['EditRefs']['id']."\n";
			if($_POST['edit']){
				if(!($this->html->validateErrors($this->data['EditRefs']))){
					$text="Faltan Datos... <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
				}
				else{
					$query="UPDATE termino_referencia,referencia SET 
						ref_libro_de='".$this->data['EditRefs']['ref_libro_de']."',
						ref_libro_es='".$this->data['EditRefs']['ref_libro_es']."',
						tr_order='".$this->data['EditRefs']['tr_order']."'
							where tr_termid='".$this->data['EditRefs']['id']."' 
							and tr_refid=ref_id 
							and ref_id='".$this->data['EditRefs']['old_ref_id']."'";
					if((!$this->db->doQuery($query))){
						$text="Error num #arf01-01 <a href=\"$url\"=>Continuar</a>";
						$this->html->flashText($text);
					}
					$text=$this->text['modification']."... <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
				}
			}
			elseif($_POST['del']){
				$query="delete from termino_referencia where 
					tr_termid='".$this->data['EditRefs']['id']."' 
					and tr_refid='".$this->data['EditRefs']['old_ref_id']."';";
				if((!$this->db->doQuery($query))){
					$text="Error num #arf01-01 <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
				}				
				$query="DELETE referencia FROM referencia 
					LEFT JOIN termino_referencia ON 
					referencia.ref_id=termino_referencia.tr_refid 
					WHERE referencia.ref_id='".$this->data['EditRefs']['old_ref_id']."' 
					and termino_referencia.tr_refid is NULL;";
				if((!$this->db->doQuery($query))){
					$text="Error num #arf01-01 <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
				}
				$text=$this->text['modification']."... <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
		}
	}
	
	function  addRefContentForm(){
		if($this->acl->aclHasPermission()){
			$url=$this->html->here."&ESCAPE=1&edit=1&exec=".$this->data['AddRefContent']['id']."\n";
			$query="UPDATE referencia SET 
				ref_def_de='$_POST[textfieldAl]',
				ref_def_es='$_POST[textfieldEs]' 
					WHERE ref_id='".$this->data['AddRefContent']['refid']."'";
			if((!$this->db->doQuery($query))){
				$text="Error num #arcf01-01 <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			$text=$this->text['modification']."... <a href=\"$url\"=>Continuar</a>";
			$this->html->flashText($text);
		}
		else{
			$this->html->authError();
		}
	}

	function addSonsForm(){
		if($this->acl->aclHasPermission()){
			$url=$this->html->here."&ESCAPE=1&edit=1&exec=".$this->data['AddSons']['id']."\n";

			$idDad=$this->getIdDe($this->data['AddSons']['hijo']);
			if(!($idDad)){
				$text="No existe el padre... <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			else{
				if($idDad==$this->data['AddSons']['id']){
					$text="Error: No puede haber un padre igual a un hijo... <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
				}
				$query="SELECT p_padre,p_hijo from parentezco where
						p_padre='$idDad' 
						and p_hijo='".$this->data['AddSons']['id']."'";
				$set=$this->db->doQuery($query);
				$line=$set->FetchRow();
				if($line['p_padre']!=NULL){
					$text="Error: ya existe la relaci&oacute;n padre-hijo  <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
				}
				$query="INSERT INTO parentezco (p_padre,p_hijo,p_idioma)
						values('$idDad',
							'".$this->data['AddSons']['id']."',
							'al'
							)";
				if((!$this->db->doQuery($query))){
					$text="Error num #asf01-02 <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
				}
				$text=$this->text['modification']."... <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}

		}
		else $this->html->authError();
	}
		
	function deleteSonsForm(){
		if($this->acl->aclHasPermission()){
			$url=$this->html->here."&ESCAPE=1&edit=1&exec=".$this->data['delSons']['id']."\n";

			$idDad=$this->getIdDe($this->data['delSons']['hijo']);
			if($idDad==$this->data['delSons']['id']){
				$text="Error num #asf01-01 <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			$query="DELETE parentezco from parentezco where
					p_padre='$idDad' 
					and p_hijo='".$this->data['delSons']['id']."'
					and p_idioma='".$this->data['delSons']['lang']."'";
			if((!$this->db->doQuery($query))){
				$text="Error num #asf01-02 <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			$text=$this->text['modification']."... <a href=\"$url\"=>Continuar</a>";
			$this->html->flashText($text);

		}

		else $this->html->authError();
	}

	function addVerTambienForm(){
		if($this->acl->aclHasPermission()){
			$url=$this->html->here."&ESCAPE=1&edit=1&exec=".$this->data['AddVerTambien']['id']."\n";
			$idOther=$this->getIdDe($this->data['AddVerTambien']['other']);
			if(!($idOther)){
				$text="No existe el otro t&eacute;rmino... <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			else{
				if($idOther==$this->data['AddVerTambien']['id']){
					$text="Error: no puedes relacionar el mismo t&eacute;rmino... <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
				}
				if($this->data['AddVerTabmien']['id']>$idOther){
					$mayor=$this->data['AddVerTambien']['id'];
					$menor=$idOther;
				}
				else{
					$menor=$this->data['AddVerTambien']['id'];
					$mayor=$idOther;
				}
				$query="SELECT ver_a,ver_b from vertambien where
					ver_a='$mayor' 
					and ver_b='$menor'";
				$set=$this->db->doQuery($query);
				$line=$set->FetchRow();
				if($line['ver_a']!=NULL){
					$text="Error: ya exite la relaci&oacute;n:  <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
				}
				$query="SELECT ver_a,ver_b from vertambien where
					ver_a='$menor' 
					and ver_b='$mayor'";
				$set=$this->db->doQuery($query);
				$line=$set->FetchRow();
				if($line['p_padre']!=NULL){
					$text="Error: ya exite la relaci&oacute;n:  <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
				}
				$query="INSERT INTO vertambien(ver_a,ver_b) 
					values('$mayor',
						'$menor')";
				//echo $query;
				if((!$this->db->doQuery($query))){
					$text="Error num #asf01-01 <a href=\"$url\"=>Continuar</a>";
					$this->html->flashText($text);
				}
				$text=$this->text['modification']."... <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);				
			}
		}
		else $this->html->authError();
	}

	function delVerTambienForm(){
		if($this->acl->aclHasPermission()){
			$url=$this->html->here."&ESCAPE=1&edit=1&exec=".$this->data['DelVerTambien']['id']."\n";
			$idOther=$this->getIdDe($this->data['DelVerTambien']['other']);
			if($idDad==$this->data['DelVerTambien']['other']){
				$text="Error num #dvtf01-01 <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			if($this->data['DelVerTabmien']['id']>$idOther){
				$mayor=$this->data['DelVerTambien']['id'];
				$menor=$idOther;
			}
			else{
				$menor=$this->data['DelVerTambien']['id'];
				$mayor=$idOther;
			}
			$query="DELETE vertambien from vertambien where 
				ver_a='$mayor' 
				and ver_b='$menor'
				or ver_a='$menor'
				and ver_b='$mayor'";
			//echo $query;
			if((!$this->db->doQuery($query))){
				$text="Error num #dvtf01-02 <a href=\"$url\"=>Continuar</a>";
				$this->html->flashText($text);
			}
			$text=$this->text['modification']."... <a href=\"$url\"=>Continuar</a>";
			$this->html->flashText($text);	
		}
		else $this->html->authError();
	}

	function getIdDe($wordde){
		$query="select t_id from termino where t_term_de='$wordde'";
		$set=$this->localFetch($query);
		//echo $query;
		$line = $set->FetchRow();
		//echo "<br>::".$line['t_id']."<br>";
		return $line['t_id'];
	}

	function getNameDe($id){
		if($id){
			$query="select * from termino where t_id=$id";
			$set=$this->localFetch($query);
			$line = $set->FetchRow();
			return $this->printTerm($line['t_term_de'],$line['t_em_de']);
		}
	}

	function getNameEs($id){
		if($id){
			$query="select * from termino where t_id=$id";
			$set=$this->localFetch($query);
			$line = $set->FetchRow();
			return  $this->printTerm($line['t_term_de'],$line['t_em_de']);
		}
	}

	function getNames($id){
		$query="select * from termino where t_id=$id";
		$set=$this->localFetch($query);
		$line = $set->FetchRow();
		$tmp=$this->printTerm($line["t_term_$this->lang"],$line["t_em_$this->lang"]);
		$tmp.="&nbsp;(".$this->printTerm($line["t_term_$this->trans"],$line["t_em_$this->trans"]).") ";
		return $tmp;
	}

	function getNamesToSave($id){
		$query="select * from termino where t_id=$id";
		$set=$this->localFetch($query);
		$line = $set->FetchRow();
		$tmp=$this->printTerm($line["t_term_$this->lang"],$line["t_em_$this->lang"]);
		$tmp.="(".$this->printTerm($line["t_term_$this->trans"],$line["t_em_$this->trans"]).")";
		return $tmp;
	}
	
	function printTerm($term,$em=NULL){
		if($em){
			return preg_replace("/$em/","<em>$em</em>", $term,1);
		}
		else return "$term";
	}
}
