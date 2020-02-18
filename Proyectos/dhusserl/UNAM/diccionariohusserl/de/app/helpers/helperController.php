<?
/**
 * This helper is the main class of the dict program
* @package snfm
* @subpackage snfm.main
* @Author SecureNet development Team
*/
class helperController extends helperModel{
	
	var $tab;
	var $controller;
	var $id;
	var $lang;
	var $text;
	var $trans;
	var $action;
	var $message;
	var $fatherarray;
	var $show=true;
	
	function showQuery($target="datamain"){
		echo "<table border=\"0\" cellpadding=\"2\" cellspacing=\"2\" class=\"datatbl\" width=\"100%\" valing=\"top\">";
		echo "<tr><td align=\"left\">";
		if(isset($this->data['palabra'][0])){
			if(preg_match('/^\%/',$this->data['palabra'][0])){
				$word=substr($this->data['palabra'][0], 1);
				$mgets="&word=".urlencode('%').$word;
			}
			else $mgets="&word=".$this->data['palabra'][0];
		}
		else $mgets=NULL;
		$url="?action=".$this->controller.$mgets;
		echo "<a href=\"$url&next=-25\"><< ".$this->text['previous']."</a></td>";
		echo "<td align=\"right\"><a href=\"$url&next=25\"> ".$this->text['next'].">></a>";
		echo "</td></tr></table><br>";
		echo "<table  class=\"datatbl\"  width=\"100%\" valign=\"top\">";
		if(!$this->recordSet){
			echo "<div class=\"cutetext\">".$this->text['nosearch']."</div>";
		}
		else{
			for($i=0;$line = $this->recordSet->FetchRow();$i++){
				if(!($class))$class="trodd";
				else $class="";
				$url=$this->html->here."&ESCAPE=1&def=1&exec=".$line['t_id'];
				echo "<tr class=$class><td>";
				echo "<a href=\"$url\" target=\"$target\">";
				echo $this->printTerm($line["t_term_$this->lang"],$line["t_em_$this->lang"])."</a>";
				echo "</td></tr>";
			}
		}
		echo "</table>";	
	}


	function showFrameQuery($id){
		if($id!="default"){
			$query="select * from termino where t_id=$id";
			$set=$this->localFetch($query);
			echo "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" valign=\"top\">\n";
			$line = $set->FetchRow();
			$this->id=$line['t_id'];
			echo "<tr><td>\n";
			echo "<table border=\"0\" width=\"100%\">";
			echo "<tr><td><div class=\"normaltitle\">";
			echo $this->printTerm($line["t_term_$this->lang"],$line["t_em_$this->lang"])."<td>";
			if($this->acl->aclHasPermission()){
				$url=$this->html->here."&ESCAPE=1&edit=1&exec=".$this->id."\n";
				echo "<td><div align=\"right\"><a class=\"tabbedlink\"href=$url>".$this->text['edit'].
				"</a></div></td>\n";
			}
			elseif($this->show){
				echo "<td><div align=\"right\">";
				echo $this->html->formTag("Html");
				echo "\n<input type=\"hidden\" name=\"nameid\" value=\"".$this->id."\">";
				echo "<input type=\"submit\" class=\"submitLink\" value=\"".$this->text['download']."\">";
				echo $this->html->closeFormTag();
				echo "</div></td>\n";
			}
			echo "</div></td></tr></table><br>";
			echo "<div class=\"titlebox\">\n<div class=\"normaltitle\">\n";
			echo "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"99%\"><tr>\n";
			echo "<td class=\"titleboxtext\" align=\"left\">\n";
			echo $this->text['namelang']."<u>";
			echo $this->printTerm($line["t_term_$this->trans"],$line["t_em_$this->trans"])."</u><hr>\n";
			$this->printRefs($this->id);
			$this->printFather($this->id);
			$this->printSons($this->id);
			$this->printVerTambien($this->id);
			echo "</td></tr></div></div><td></tr></table>\n";
		}
		else echo "Diccionario de Terminos Filosoficos";
	}

	function HtmlForm(){
		$this->show=false;
		$name=$this->getNamesToSave($_POST['nameid']).".html";
		header("Content-Type: application/html;");
		header("Content-Disposition: attachment; filename=\"$name\"");
		echo "<html><body>";
		$this->showFrameQuery($_POST['nameid']);
		echo "</body></html>";
		die;
	}

	function printSons($id,$limit=0){
		$query="select p_padre from parentezco where p_hijo=$id and p_idioma='al'";
		$set=$this->localFetch($query);
		list($col,$lines)=$this->db->doCounts($set);
		if(!($lines)) return NULL;
		echo "<hr>".$this->text['derivedfrom'].":\n";
		echo "<ul>\n";
		for($i=0;$line = $set->FetchRow();$i++){
			$this->showSons($line['p_padre'],$limit+1);
		}
		echo "</ul>\n";
	}

	function showSons($id,$limit){
		if($limit<3){
			$query="select t_term_de,t_term_es,t_id from termino where t_id=$id";
			$set=$this->localFetch($query);
			list($col,$lines)=$this->db->doCounts($set);
			if(!($lines)) return NULL;
			$line = $set->FetchRow();
			$ident=$this->getRandomString(6);
			echo "<div class=\"cutetext\"><li><p onClick=\"expandcontent('$ident')\"style=\"cursor:hand;cursor:pointer\">";
			echo $line['t_term_de']." <font color=\"black\">(".$line['t_term_es'].")</font></p></li></div>\n";
			echo "<div id=\"$ident\" class=\"switchcontent\">\n";
			echo "<div class=\"titlebox\">\n<div class=\"normaltitle\">\n";
			echo "<table border=0 cellpadding=0 cellspacing=0 width=99%><tr>\n";
			echo "<td class=titleboxtext align=left>\n";
			$this->printRefs($line['t_id']);
			$this->printFather($line['t_id']);
			$this->printSons($line['t_id']);
			$this->printVerTambien($line['t_id']);
			echo "</td></tr></table></div></div></div>\n";
		}
	}


	function printFather($id){
		$this->fatherarray[]=$id;
		$query="select p_hijo from parentezco where p_padre=$id and p_idioma='al'";
		$set=$this->localFetch($query);
		list($col,$lines)=$this->db->doCounts($set);
		if(!($lines)) return NULL;
		elseif ($lines==1){
			$tmpset=$set;
			$line=$tmpset->FetchRow();
			if (in_array($line['p_hijo'], $this->fatherarray)) return NULL;
		}
		echo "<hr>".$this->text['derived']."\n";
		echo "<ul>\n";
		for($i=0;$line = $set->FetchRow();$i++){
			if (!(in_array($line['p_hijo'], $this->fatherarray)))	$this->showFather($line['p_hijo'],$id);
		}
		echo "</ul>\n";
	}

	function showFather($id,$idnot){
		$query="select t_term_de,t_term_es,t_id from termino where t_id=$id";
		$set=$this->localFetch($query);
		list($col,$lines)=$this->db->doCounts($set);
		if(!($lines)) return NULL;
		$line = $set->FetchRow();
		$ident=$this->getRandomString(10);
		echo "<div class=cutetext><li><p onClick=\"expandcontent('$ident')\"style=\"cursor:hand;cursor:pointer\">";
		echo $line['t_term_de']." <font color=black>(".$line['t_term_es'].")</font></p></li></div>\n";
		echo "<div id=\"$ident\" class=\"switchcontent\">\n";
		echo "<div class=\"titlebox\">\n<div class=\"normaltitle\">\n";
		echo "<table border=0 cellpadding=0 cellspacing=0 width=99%><tr>\n";
		echo "<td class=titleboxtext align=left>\n";
		$this->printRefs($line['t_id']);
		$this->printVerTambien($line['t_id']);
		echo "</td></tr></table></div></div></div>\n";
	}


	function printVerTambien($id){
		$query="select ver_b from vertambien where ver_a='$id' union select ver_a from vertambien where ver_b='$id'";
		$set=$this->localFetch($query);
		list($col,$lines)=$this->db->doCounts($set);
		if($lines>0) echo "<hr>".$this->text['also']." \n<ul>\n";
		for($i=0;$line = $set->FetchRow();$i++){
			$url=$this->html->here."&ESCAPE=1&def=1&exec=".$line[0]."\n";
			echo "<li><a href=\"$url\">".$this->getNameDe($line[0])."</a></li>\n";
		}
		echo "</ul>";
	}

	function orderRefs($tmparray){
		$not="/^[^IP|^PW|^I1|^I2|^PV|^CM]/i";
		$regex=array("/^IP/i","/^PW/i","/^I1/i","/^I2/i","/^PV/i","/^CM/i","$not");
		foreach ($regex as $expression){
			foreach ($tmparray as $value)if (preg_match("$expression", $value['ref_id']))$tmp[]=$value;
		}
		return ($tmp);
	}
	
	function getRefs($id,$which){
		$query="select ref_libro_de,ref_libro_es,ref_id,tr_order from 
			termino_referencia,referencia where tr_termid=$id and tr_refid=ref_id and tr_order=$which";
		$set=$this->localFetch($query);
		for($i=0;$line = $set->FetchRow();$i++)	$tmp[]=$line;
		if($tmp) $tmp=$this->orderRefs($tmp);
		return $tmp;
	}
	
	function printRefs($id){
                $array1=$this->getRefs($id,1);
                $array2=$this->getRefs($id,2);
                if(($array1) and ($array2))$array = array_merge($array1,$array2);
                elseif(($array1)and(!($array2))) $array=$array1;
                elseif(($array2)and(!($array1))) $array=$array2;
		echo $this->text['reference'].": \n";
		echo '<table border="0"  width "50%">';
		echo "<tr><th class=\"thtitle\">".$this->text['view']."</th><th class=\"thtitle\">".$this->text['de']."</th>";
		echo "<th class=\"thtitle\">".$this->text['es']."</th><th class=\"thtitle\">".$this->text['level']."</th></tr>";
		if(is_array($array)){
			foreach($array as $line){
				$url=$this->html->here."&ESCAPE=1&ref=1&exec=".$line['ref_id']."&nameid=$id\n";
				echo "<tr><td align=\"center\" class=\"tdnormal\">\n";
				if($this->show) echo"<a href=\"$url\"><font size=3> >>> </font></a>\n";
				else echo "---";
				echo "</td>\n"; 
				echo "<td class=\"tdnormal\">". $line['ref_libro_de']."</td>\n";
				echo "<td class=\"tdnormal\">". $line['ref_libro_es']."</td>\n";
				echo "<td class=\"tdnormal\" align=\"middle\">". $line['tr_order']."</td></tr>\n";
			}
		}
		echo "</table>";
	}

	function showRefs($idpage,$nameid,$url){
		$query="select ref_def_de, ref_def_es from referencia where ref_id='$idpage'";
		$set=$this->localFetch($query);
		if($nameid<0) $names="";
		else $names=$this->getNames($nameid)." :";
		echo "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr><td>";
		echo "<div class=\"cutebox\">\n";
		echo "<table border=\"0\" width=\"99%\">\n";
		echo "<tr><td width=\"50%\" align=\"left\">\n";
		echo "<a class=\"tabbedlink\" href=\"$url\">".$this->text['goback']."</a></td>\n";
		echo "<td width=\"50%\" align=\"right\">".$this->text['fullscreen']."</td></tr></table>\n";
		echo "<div class=\"normaltitle\"><br>".$names."</div>";
		echo "<table cellspacing=\"6\" cellpadding=\"6\"  border=\"0\">\n";
		echo "<tr valign=\"top\">\n";
		$line = $set->FetchRow();
		$string=$this->parseHrefinRefs($line['ref_def_de']);
		$string=$this->parseFontsinRefs($string);
		if($nameid>0)$string=$this->parseBoldTextinRefs($string,$this->getNameDe($nameid));
		echo "<td width=\"50%\" class=\"tddef\">".$string."</td>\n";
		$string=$this->parseHrefinRefs($line['ref_def_es']);
		$string=$this->parseFontsinRefs($string);
		if($nameid>0)$string=$this->parseBoldTextinRefs($string,$this->getNameEs($nameid));
		echo "<td width=\"50%\" class=\"tddef\">".$string."</td>\n";
		echo "</tr></table></div>";
		echo "</td></tr></table>";
	}

	function parseHrefinRefs($string){
		if(!(preg_match_all("/<A(.*?)<\/A>/i",$string,$arr,PREG_PATTERN_ORDER))){
			return $string;
		}
		if (sizeof($arr[0]) == 1){
			preg_match('/"(.*?)"/',$arr[1][0],$tmp);
			$orig=$tmp[1];
			preg_match('/(.*?)\./',$orig,$new);
			$new=strtolower($new[1]);
			$url=$this->html->here."&ESCAPE=1&ref=1&exec=".$new."&nameid=-1\n";
			$string=preg_replace("#($orig)#",$url,$string);	
		}
		else{	
			foreach ($arr[1] as $value){
				preg_match('/"(.*?)"/',$value,$tmp);
				$orig=$tmp[1];
				preg_match('/(.*?)\./',$orig,$new);
				$new=strtolower($new[1]);
				$url=$this->html->here."&ESCAPE=1&ref=1&exec=".$new."&nameid=-1\n";
				$string=preg_replace("/($orig)/",$url,$string);
			}
		}
		return ($string);
	}

	function parseFontsinRefs($string){
		$find="=-1";
		$replace="=-2";
		return $string=preg_replace("#($find)#",$replace,$string);
	}

	function parseBoldTextinRefs($string,$find){
		$find=htmlentities($find);
		$replace="<strong>$find</strong>";
		return $string=preg_replace("#($find)#i",$replace,$string);
	}
		
	function showEditWindow(){
		if($this->acl->aclHasPermission()){
			if(isset($this->message))echo "<div class=\"\"><font color=\"\">".$this->message."</font></div>";
			$this->id=$_GET['exec'];
			echo "<table border=0 cellpadding=0 cellspacing=0 width=100% valign=top>\n";
			echo "<tr><td>\n";
			echo "<div class=\"titlebox\">\n";
			$this->showEditItems($this->id);
			$this->showEditRefs($this->id);
			$this->showEditSons($this->id);
			$this->showEditVerTambien($this->id);
			echo "</div></tr></td></table>\n";
			
		}
	}
	
	function showEditItems($id){
		$query="select * from termino where t_id=$id";
		$set=$this->localFetch($query);
		$line = $set->FetchRow();
		echo $this->html->formTag("editItems");
		echo "<table border=\"0\" width=\"100%\">";
		$array=array("style"=>"font-size:12px",
				"value"=>$line["t_term_de"]);
		echo "<tr><td align=\"left\"><div class=\"normaltitle\">";
		echo $this->text['word']." ".$this->text['de'].":</div></td>";
		echo "<td>".$this->html->inputTag("editItem/wordde",35,$array)."</td>";
		$array=array("style"=>"font-size:12px","name"=>"del","onclick"=>"return confirmSubmit()");
		echo "<td align=\"center\">".$this->html->submitTag($this->text['del'],$array)."</td></tr>";
		$array=array("style"=>"font-size:12px",	"value"=>$line["t_em_de"]);
		echo "<tr><td align=\"left\"><div class=\"normaltitle\">\n";
		echo $this->text['cursives'].": </div></td>";
		echo "<td>".$this->html->inputTag("editItem/cursde",35,$array)."</td>";
		$array=array("style"=>"font-size:12px",	"value"=>$line["t_term_es"]);
		echo "<tr><td align=\"left\"><div class=\"normaltitle\">\n";
		echo $this->text['translation'].":</div></td>";
		echo "<td>".$this->html->inputTag("editItem/wordes",35,$array)."</td>";
		$array=array("style"=>"font-size:12px",	"value"=>$line["t_em_es"]);
		echo "<tr><td align=\"left\"><div class=\"normaltitle\">\n";
		echo $this->text['translation']." ".$this->text['cursives'].":</div></td>";
		echo "<td>".$this->html->inputTag("editItem/curses",35,$array)."</td>";
		$array=array("style"=>"font-size:12px");
		echo "<td align=\"center\">".$this->html->submitTag($this->text['edit'],$array)."</td></tr>\n";
		echo $this->html->hiddenTag("editItem/id",$this->id);
		echo "</table>\n";
		echo $this->html->closeFormTag();
	}
	
	function showEditVerTambien($id){
		$query="select ver_b from vertambien where ver_a='$id' union select ver_a from vertambien where ver_b='$id'";
		$set=$this->localFetch($query);
		list($col,$lines)=$this->db->doCounts($set);
		echo "<hr><div class=\"normaltitle\">Ver tambi&eacute;n: </div><br>\n";
		echo '<table border="0"  width "50%">';	
		echo '<tr><th class="thtitle">Ver tabmi&eacute;n</th><th class="thtitle">-</th></tr>';
		for($i=0;$line = $set->FetchRow();$i++){
			echo $this->html->formTag("delVerTambien");	
			$array=array("style"=>"font-size:9px","onclick"=>"return confirmSubmit()");
			echo "<tr><td class=\"tdnormal\">".$this->getNameDe($line[0])."</td>";
			echo $this->html->hiddenTag("DelVerTambien/id",$id);
			echo $this->html->hiddenTag("DelVerTambien/other",$this->getNameDe($line[0]));
			echo "<td class=\"tdnormal\" align=\"middle\">".$this->html->submitTag($this->text['del'],$array)."</td></tr>\n";
			echo $this->html->closeFormTag();	
		}
		echo $this->html->formTag("addVerTambien");
		$array=array("style"=>"font-size:9px","maxlength"=>"60");
		echo "<tr><td class=\"tdnormal\">".$this->html->inputTag("AddVerTambien/other",60,$array)."</td>\n";
		echo $this->html->hiddenTag("AddVerTambien/id",$id);
		echo "<td class=\"tdnormal\" align=\"middle\">".$this->html->submitTag($this->text['add'],$array)."</td></tr></table>\n";
		echo $this->html->closeFormTag();
	}
	
	function showEditSons($id){
		$query="select p_padre from parentezco where p_hijo=$id and p_idioma='al'";
		$set=$this->localFetch($query);
		list($col,$lines)=$this->db->doCounts($set);
		echo "<hr><div class=\"normaltitle\">".$this->text['derivedfrom'].": </div><br>\n";
		echo '<table border="0"  width "50%">';
		echo "<tr><th class=\"thtitle\">".$this->text['derivedfrom']."</th><th class=\"thtitle\">-</th></tr>";
		for($i=0;$line = $set->FetchRow();$i++){
			echo $this->html->formTag("deleteSons");	
			echo $this->html->hiddenTag("delSons/id",$id);
			echo $this->html->hiddenTag("delSons/lang","al");
			$array=array("style"=>"font-size:9px","name"=>"del","onclick"=>"return confirmSubmit()");
			echo "<tr><td class=\"tdnormal\">".$this->getNameDe($line['p_padre'])."</td>";
			echo $this->html->hiddenTag("delSons/hijo",$this->getNameDe($line['p_padre']));
			echo "<td class=\"tdnormal\" align=\"middle\">".$this->html->submitTag($this->text['del'],$array)."</td></tr>\n";
			echo $this->html->closeFormTag();
		}
		echo $this->html->formTag("addSons");
		$array=array("style"=>"font-size:9px","maxlength"=>"60");
		echo "<tr><td class=\"tdnormal\">".$this->html->inputTag("AddSons/hijo",60,$array)."</td>\n";
		echo $this->html->hiddenTag("AddSons/id",$id);
		echo $this->html->hiddenTag("AddSons/lang","al");
		$array=array("style"=>"font-size:9px","name"=>"add");
		echo "<td class=\"tdnormal\" align=\"middle\">".$this->html->submitTag($this->text['add'],$array)."</td></tr></table>\n";
		echo $this->html->closeFormTag();
	}
	
	function showEditRefs($id){
		$array1=$this->getRefs($id,1);
                $array2=$this->getRefs($id,2);
                if(($array1) and ($array2))$array = array_merge($array1,$array2);
                elseif(($array1)and(!($array2))) $array=$array1;
                elseif(($array2)and(!($array1))) $array=$array2;
		echo "<hr><div class=\"normaltitle\">".$this->text['reference'].": </div><br>\n";
		echo "<table border=\"0\"  width=\"50%\">\n";
		echo "<tr><th class=\"thtitle\">".$this->text['link']."</th>\n";
		echo "<th class=\"thtitle\">Id</th>\n";
		echo "<th class=\"thtitle\">".$this->text['de']."</th>\n";
		echo "<th class=\"thtitle\">".$this->text['es']."</th><th class=\"thtitle\">".$this->text['level']."</th>\n";
		echo "<th class=\"thtitle\">-</th><th class=\"thtitle\">-</th></tr>\n\n\n";
		if(is_array($array)){
			foreach($array as $line){
				echo $this->html->formTag("EditRefs");	
				$url=$this->html->here."&ESCAPE=1&edit=1&exec=".$id."&refid=".$line['ref_id']."\n";
				echo "<tr><td class=\"tdnormal\"><a href=\"$url\">".$this->text['view']."</a></td>\n";
				echo "<td class=\"tdnormal\" align=\"middle\">".$line['ref_id']."</td>";
				$array=array("style"=>"font-size:9px","maxlength"=>"30","value"=>$line['ref_libro_de']);
				echo "<td class=\"tdnormal\" align=\"middle\">".$this->html->inputTag("EditRefs/ref_libro_de",28,$array)."</td>";
				$array=array("style"=>"font-size:9px","maxlength"=>"30","value"=>$line['ref_libro_es']);
				echo "<td class=\"tdnormal\" align=\"middle\">".$this->html->inputTag("EditRefs/ref_libro_es",28,$array)."</td>";
				$array=array("style"=>"font-size:9px","maxlength"=>"1","value"=>$line['tr_order']);
				echo "<td class=\"tdnormal\" align=\"middle\">".$this->html->inputTag("EditRefs/tr_order",1,$array)."</td>";
				echo $this->html->hiddenTag("EditRefs/id",$id);
				echo $this->html->hiddenTag("EditRefs/old_ref_id",$line['ref_id']);
				$array=array("style"=>"font-size:9px","name"=>"del","onclick"=>"return confirmSubmit()");
				echo "<td class=\"tdnormal\" align=\"middle\">".$this->html->submitTag($this->text['del'],$array)."</td>\n";
				$array=array("style"=>"font-size:9px","name"=>"edit");
				echo "<td class=\"tdnormal\" align=\"middle\">".$this->html->submitTag($this->text['edit'],$array)."</td></tr>\n";
				echo $this->html->closeFormTag();
			}
		}
		echo $this->html->formTag("AddRefs");
		$array=array("style"=>"font-size:9px","maxlength"=>"10");
		echo "<tr><td></td>";
		echo "<td class=\"tdnormal\">".$this->html->inputTag("AddRefs/ref_id",6,$array)."</td>\n";
		$array=array("style"=>"font-size:9px","maxlength"=>"31");
		echo "<td class=\"tdnormal\">".$this->html->inputTag("AddRefs/ref_libro_de",28,$array)."</td>\n";
		echo "<td class=\"tdnormal\">".$this->html->inputTag("AddRefs/ref_libro_es",28,$array)."</td>\n";
		$array=array("style"=>"font-size:9px","maxlength"=>"1");
		echo "<td class=\"tdnormal\" align=\"middle\">".$this->html->inputTag("AddRefs/tr_order",1,$array)."</td>\n";
		echo "<td class=\"tdnormal\" align=\"middle\">-</td>\n";
		echo "<td class=\"tdnormal\" align=\"middle\">".$this->html->submitTag($this->text['add'],$array)."</td></tr>\n";
		echo $this->html->hiddenTag("AddRefs/id",$id);
		echo $this->html->closeFormTag();
		echo "</table>";
	}

	function showEditRefContent(){
		$idpage=$_GET['refid'];
		$id=$_GET['exec'];
		$query="select ref_def_de, ref_def_es from referencia where ref_id='$idpage'";
		$set=$this->localFetch($query);
		$line = $set->FetchRow();
		$string=$this->parseHrefinRefs($line['ref_def_de']);
		echo "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr><td>";
		echo "<div class=\"cutebox\">\n<div class=\"normaltitle\">Alem&aacute;n:</div>\n";
		echo "<table cellspacing=\"2\" cellpadding=\"2\"  border=\"0\" width=\"100%\">\n";
		echo $this->html->formTag("AddRefContent");
		$array=array("style"=>"font-size:9px");
		echo "<tr><td>".$this->dhtml->textEditor("textfieldAl",$string,"Basic","default",490,200)."</td></tr>";
		echo "<tr><td align=\"left\"><div class=\"normaltitle\">Espa&ntilde;ol:</div></td></tr></table>\n";
		echo "<table cellspacing=\"2\" cellpadding=\"2\"  border=\"0\" width=\"100%\">\n";
		$string=$this->parseHrefinRefs($line['ref_def_es']);
		echo "<tr><td>".$this->dhtml->textEditor("textfieldEs",$string,"Basic","default",490,200)."</td></tr>";
		echo "<tr><td align=\"right\">". $this->html->submitTag($this->text['save'],$array)."</td></tr>\n";
		echo $this->html->hiddenTag("AddRefContent/id",$id);
		echo $this->html->hiddenTag("AddRefContent/refid",$idpage);
		echo $this->html->closeFormTag();
		echo "</table>";
		echo "</div></td></tr></table>";
	}
	
   	/**
        *  Draws a title box from the themes.
        * @access public
        * @return void
        */
	function drawTitle($htmlcode){
		echo "<div class=\"titlebox\">\n<div class=\"normaltitle\">\n";
		echo "<table border=0 cellpadding=0 cellspacing=0 width=99%><tr>";
		echo "<td class=titleboxtext align=left>$htmlcode";
		echo "</td></tr></table></div></div>";
	}
	
	/**
        *  Draws tabs in page
	* Does not uses params. rather uses the $this->data['TABS'] set in the corresponding controlerclass
        * @access public
        * @return void
        */
	function drawTabs(){
		echo "<table border=0 cellpadding=0 cellspacing=0 ><tr>";
		if($this->lang=="de")$array=("A,&#196;,B,C,D,E,F,G,H,I,J,K,L,M,N,O,&#214;,P,Q,R,S,T,U,&#220;,V,W,X,Y,Z");
		if($this->lang=="es")$array=("A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z");
		$array=split(",",$array);
		foreach ($array as $value){
			echo "<td><div class=tabbedlink>";
			echo "<a class=tabbedlink href=\"".$this->html->base."?action=".$this->controller."&letter=$value\">";
			echo "&nbsp;$value&nbsp;";
			echo "</a></div></td>";
		}
		echo "</tr></table>";
	}
	
	function getRandomString($length){
		settype($template, "string");
		$template = "1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz";
		settype($length, "integer");
		settype($rndstring, "string");
		settype($a, "integer");
		settype($b, "integer");
		for ($a = 0; $a <= $length; $a++) {
			$b = rand(0, strlen($template) - 1);
			$rndstring .= $template[$b];
		}
		return $rndstring;
	}

	function validateGets(){
		$validateGet=array("action"=>"string",
				"ESCAPE"=>"int",
				"nameid"=>"int",
				"exec"=>"string",
				"refid"=>"string",
				"def"=>"int",
				"ref"=>"int",
				"edit"=>"int");
		if(!($this->html->validateGets($validateGet)))$this->html->authError("getErr");
	}
	
	function isAllowed(){
		//echo "here";
		//die;
		if(!($_SESSION['ACCESS'])) header('Location: '.URL.'?action=siteaccess');
	}
	

}

?>
