<?
/**
 * Root SNFMModel functionalities.
 * Purpose: Basic ADODB functionality. It creates and ADODB objet and makes querys. one
 * might also use ADODB functionality if its necesary.
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
 * Object snfmModel, parent class of the whole framework.
 *
 * @package snfm
 * 
 */

class snfmModel{
	/**
        * Database connection, if available.
        * @access private
        * @var adodb
        */
	var $DB;
	/**
        * HTML helper objetct.
        * @access public
        * @var html
        */
	var $html;
	/**
        * string with the name of the table for CRUD ops
        * @access public
        * @var string
        */
	var $crudTable;
	
	/**
        * array containing many info about the CRUD. Form name, type of form, table headers, etc
        * @access public
        * @var array
        */
	var $curdTh=array();
	
	/**
        * string with the name of the css class for the CRUD operations
        * @access public
        * @var string
        */
	var $crudClass;
	
	/**
        * string with the name of key field for the CRUD table
        * @access public
        * @var string
        */
	var $crudKey;
	
	/**
        * array containing select info for the select input type in html forms for the CRUD add and edit ops
        * @access public
        * @var array
        */
	var $selectTag;

	/**
	* string to specify the field used in ORDER BY so the table ordering behaves in a predictable way
	* @access public
	* @var string
	*/
	var $crudOrderBy;

	/**
        * string to determine some operations within crudTable
        * @access private
        * @var string
        */
	var $crudFlag;
	
	/**
        * string with the message to be displayed on screen
        * @access private
        * @var string
        */
	var $crudMesg;
	/**
        * string with a warning messsage
        * @access private
        * @var string
        */
	var $curdWarn;
	/**
        * string title for the add form
        * @access private
        * @var string
        */
	var $crudFormTitle;
	/**
        * string title for the table
        * @access private
        * @var string
        */
	var $crudTableTitle;
	/**
        * string title for the edit form
        * @access private
        * @var string
        */
	var $crudEditTitle;
	/**
        * string for the insert secuence for crud ops
        * @access private
        * @var string
        */
	var $crudInsert;
	/**
        * array used internaly,its a line containging a record
        * @access private
        * @var array
        */
	var $crudLine;
	
	/**
        * string with the key field of the current record being edited
        * @access private
        * @var string
        */
	var $crudRecordKey;
	
	/**
        * string coma separated list with the hidden elements for the crud table
        * @access private
        * @var string
        */
	var $crudHidden;
	
	/**
        * string with a password field for Crud ops
        * @access private
        * @var string
        */
	var $crudPassField;

	/**
        * string with a sql code for a where clause for the createTable functionality
        * @access private
	* @var string
	* 
	*/
	var $crudWhere;

	/**
        * If FLASE then return validation as false because there most be an error
        * @access public
	* @var bool
	* 
	*/
	var $crudValidate;
		
	/****************************************************************************************************/
	
	
	/* Main constructor.
       	* Initializes html and adodb objetcs
	*
       	* @returns void
       	*/


	function __construct(){
		global $DB;
		$this->html=new htmlAssistant();
		$this->crudWhere=NULL;
		$this->crudValidate=TRUE;
		$this->DB = NewADOConnection($DB['DRIVER']);
		if ($DB['DRIVER'] == "oci8"){
			$this->DB->charSet=$DB['CHARSET'];
		}
		if(!($this->DB->Connect($DB['SERVER'],$DB['USER'],$DB['PASSWORD'],$DB['DATABASE']))){
			echo "<h1>No pude conectarme a la base de datos</h1>";
			die();
		}
		/*$query="ALTER SESSION SET NLS_DATE_FORMAT='DD/MM/YYYY'";
		$this->database->Execute($query);*/
	}


       /* Main constructor.
       	* Initializes html and adodb objetcs
	*
       	* @returns void
       	*/
	function snfmModel(){
		$this->__construct();

	}

	/**
	 *
        * Api for executing querys.
	*
        * @param string $query query to be executed.
        * @return array 
        */
	function doQuery($query){
		global $WEBMASTER;
		$query = (! get_magic_quotes_gpc ()) ? addslashes ($query) : $query;
		//echo $query;
		if(!$rs = $this->DB->Execute($query)){
			//$this->html->displayError("Error #2000.2:<br>Comunicarse con $WEBMASTER");
			//print "Database Error: ".$this->DB->ErrorMsg();
			return $rs;
		}
		else{
			return $rs;
		}
	}
		
	/**
	* Api for executing querys. No slashing to the SQL quotes -> because Oracle is not so SMART
	*
        * @param string $query query to be executed.
        * @return array 
        */
	function doQueryNS($query){
		global $WEBMASTER;
		if(!$rs = $this->DB->Execute($query)){
			//$this->html->displayError("Error #2000.2.1:<br>Comunicarse con $WEBMASTER");
			print "Database Error: ".$this->DB->ErrorMsg();
			return $rs;
		}
		else{
			return $rs;
		}
	}
	/**
	 * Api for counting num of rows and lines in a recordset
	 * @access public
	 * @param string $recordSet.
	 * @return array  num[0]=rowcount num[1]=linecount
	 * */
	function doCounts($recordSet){
		global $WEBMASTER;
		if(!($num[0]=$recordSet->FieldCount())){
			//$this->html->displayError("Error #2000.3:<br>Comunicarse con $WEBMASTER");
			return false;
		}
		if(!($num[1]=$recordSet->RecordCount())){
			//$this->html->displayError("Error #2000.4:<br>Comunicarse con $WEBMASTER");
			return false;
		}
		return $num;
	}
	/**
        * Api for counting num of rows and fields ina recordset
	* @acess public
        * @param string $recordSet query to be executed.
        * @return array each record is field
        */
	function getFields($recordSet){
		for ($i=0;$i<$recordSet->FieldCount();$i++){
			$name=$recordSet->FetchField($i);
			$array[$i]=$name->name;
		}
		return $array;
	}
	
	/**
        * Api for closing adodb objetc
       	* @access public
        */
	function closeDB(){
		$this->DB->close();
	}

        /* Api for making a catalog
	* @param string  $table  string table name of table for the catalog
	* @param string $fieldA string field1 of the table
	* @param string $fieldB string field2 of the table
       	* @access public
	* @return array $array which contains the catalog
        */
	/**
	 * 
	 *
	 * @param unknown_type $table
	 * @param unknown_type $fieldA
	 * @param unknown_type $fieldB
	 * @return unknown
	 */
	function getCatalog($table,$fieldA,$fieldB){
		$query="select $fieldA,$fieldB from $table";
		if(!($set=$this->doQuery($query))){
			return array(""=>"");
		}
		$array=array();
		while($line=$set->FetchRow()){
			$array[$line[0]]=$line[1];
		}
		return $array;
	}

	/**
        * Api for making a catalog with extended functionality
	* @param string  $table  string table name of table for the catalog
	* @param string $fieldA string field1 of the table
	* @param string $fieldB string field2 of the table
	* @param string $where WHERE clause
	* @param string $order ORDER BY field(s)
	* @param bool $addEmpty Add an empty catalog entry at the beginning.
       	* @access public
	* @return array $array which contains the catalog
        */
	function xtdGetCatalog($table,$fieldA,$fieldB,$where="",$order="",$addEmpty=FALSE){
		$query="select $fieldA,$fieldB from $table";
		if(strlen($where))
			$query.=" WHERE $where";
		if(strlen($order))
			$query.=" ORDER BY $order";

		if(!($set=$this->doQuery($query))){
			return array(""=>"");
		}
		$array=array();
		if($addEmpty)
			$array[""]="";

		while($line=$set->FetchRow()){
			$array[$line[0]]=$line[1];
		}
		return $array;

	}


	/**
	* Api for setting up table, the parameter $CRUD its created automagically by the scripts, just fill in
	* the blancs
	* @access public
	* @param array $CRUD
	* @return void
	*/
	function crudStart($CRUD){
		$this->crudNameTh($CRUD['THNAMES']);
		$this->crudWidthTh($CRUD['THWIDTH']);
		$this->crudFormTag($CRUD['FORMNAMES'],$CRUD['FORMS']);
		$this->crudInsertTag($CRUD['INSERT']);
		$this->crudOrderBy($CRUD['ORDERBY']);
		$this->crudValidateTag($CRUD['VALIDATE']);
		$this->crudOptionalFieldTag($CRUD['OPTIONALFIELD']);
		$this->crudPassField=$CRUD['PASS'];
		$this->crudTable=$CRUD['TABLE'];
		$this->crudClass=$CRUD['CSSCLASS'];
		$this->crudKey=$CRUD['KEY'];
		$this->crudFormTitle=$CRUD['FORMTITLE'];
		$this->crudInsert=$CRUD['INSERT'];
		$this->crudTableTitle=$CRUD['TABLETITLE'];
		$this->crudEditTitle=$CRUD['EDITTITLE'];
		$this->crudHidden($CRUD['HIDDEN']);
		$this->crudHiddenForm($CRUD['HIDDENFORM']);
	}
	
	/**
	* Api for setting up hidden elements in the table
	* the blancs
	* @access private
	* @param array $CRUD
	* @return bool
	*/
	function isHidden($name){
		/* Probably deprecated as of 13.09.06 because of hidden field
		handling changes by FXAH */
		if(!($this->crudHidden))return false;
		foreach(split(",",$this->crudHidden) as $value){
			if($name==$value)return true;
		}
		return false;
	}
	
	/**
	*Api for setting up the insertion of the forms
	* @access private
	* @param string $insert is the name of the  insertion  in csv
	* @return void
	 */
	function crudInsertTag($insert){
		$array=array();
		$array=split(",",$insert);
		for($i=0;$i<count($array);$i++){
			$this->crudTh[$i]["insert"]=$array[$i];
		}
	}
	
	/**
	*Api for setting up the field name used in the ORDER BY clause in SELECT statements
	* @access private
	* @param string $orderBy contains the field names separated by a comma
	* @return void
	 */
	function crudOrderBy($orderBy){
		if(strlen($orderBy))
			$this->crudOrderBy=$orderBy;
		else
			$this->crudOrderBy="";
		}
	
	/**
	*Api for setting up the name of the forms and its labes
	* @access private
	* @param string $formname is the name of the forms in csv
	* @param string $formtag is the name of the labels in csv
	* @return void
	 */	
	function crudFormTag($formname,$formTag){
		$array=array();
		$array=split(",",$formname);
		for($i=0;$i<count($array);$i++){
			$this->crudTh[$i]["formname"]=$array[$i];
		}
		$array=array();
		$array=split(",",$formTag);
		for($i=0;$i<count($array);$i++){
			$this->crudTh[$i]["form"]=$array[$i];
		}
		return NULL;
	}
	
	/**
	*Api for setting up the validation of the forms
	* @access private
	* @param string $validate is the name of the validations in csv
	* @return void
	 */
	function crudValidateTag($validate){
		$array=array();
		$array=explode(",",$validate);
		for($i=0;$i<count($array);$i++){
			$this->crudTh[$i]["validate"]=$array[$i];
		}
	}
	
	/**
	*Api to set field optionallity
	* @access private
	* @param string $optional field optionallity flag in CSV
	* @return void
	 */
	function crudOptionalFieldTag($optional){
		$array=array();
		$array=explode(",",$optional);
		for($i=0;$i<count($array);$i++){
			if(strtoupper($array[$i])=="TRUE")
				$this->crudTh[$i]["optionalfield"]=1;
			else
				$this->crudTh[$i]["optionalfield"]=0;
		}
	}

	/**
	*Api to set field visibility
	* @access private
	* @param string $hidden field visibility flag in CSV
	* @return void
	 */
	function crudHidden($hidden){
		$array=array();
		$array=explode(",",$hidden);
		for($i=0;$i<count($array);$i++){
			if(strtoupper($array[$i])=="TRUE")
				$this->crudTh[$i]["hidden"]=1;
			else
				$this->crudTh[$i]["hidden"]=0;
		}
	}

	/**
	*Api to set field visibility
	* @access private
	* @param string $hidden field visibility flag in CSV
	* @return void
	 */
	function crudHiddenForm($hidden){
		$array=array();
		$array=explode(",",$hidden);
		for($i=0;$i<count($array);$i++){
			if(strtoupper($array[$i])=="TRUE")
				$this->crudTh[$i]["hiddenForm"]=1;
			else
				$this->crudTh[$i]["hiddenForm"]=0;
		}
	}


	/**
    	* Api for setting up the select fields in the add and edit form
	* @access private
	* @param string $formname is the name of the forms 
	* @param array $select tag array for the select options in format ("select"=>"option")
	* @return void
    	*/	
	function crudSelectTag($name,$array){
		$this->selectTag[$name]=$array;
	}

	/**
	* Api for setting up the table headers for the crud table
	* @access private
	* @param string $names of the table headers)
	* @return void
	*/
	function crudNameTh($names){
		$array=split(",",$names);
		for($i=0;$i<count($array);$i++){
			$this->crudTh[$i]["name"]=$array[$i];
		}
		return NULL;
	}

	/**
	* Api for setting up the table headers size for the crud table
	* @access private
	* @param string $witdh of the table headers)
	* @return void
	*/
	function crudWidthTh($widths){
		$array=split(",",$widths);
		for($i=0;$i<count($array);$i++){
			$this->crudTh[$i]["width"]=$array[$i];
		}
		return NULL;
	}

	/**
	* Api for setting for print the forms for the ADD and EDIT forms
	* @access private
	* @param string $name name of the indiviual form element
	* @param string $formName name of the whole form
	* @param string $value for the value field of the individual form element
	* @return string with the html code for the form
	*/
	function putCrudForm($name,$formName,$value=NULL){		
		switch ($name['form']){
			case "input":
				$array=array("class"=>$this->crudClass,"value"=>$value);
				return $this->html->inputTag("$formName/$name[formname]","",$array);
				break;
			case "select":
				$array=array("class"=>$this->crudClass);
				return $this->html->selectTag("$formName/$name[formname]",
					$this->selectTag[$name['formname']],$value,$array);
				break;
			case "password":
				$array=array("class"=>$this->crudClass,"value"=>$value);
				if ($this->crudFlag=="EDIT"){
					$text="Click para cambiar";
					$url=URL."?action=$_GET[action]&crud=PASS&user=$this->crudRecordKey";
					return " <div class=\"".$this->crudClass."Key\"><a class=\"$this->crudClass\" href=\"$url\">$text</a></div>";
				}
				else{
					return $this->html->passwordTag("$formName/$name[formname]","",$array);
				}
				break;
			default:
				break;
		}
	}
	
	/**
	* Api for setting for print the forms for the ADD and EDIT forms
	* @access private
	* @param string $name name of the indiviual form element
	* @param string $formName name of the whole form
	* @param string $value for the value field of the individual form element
	* @return string with the html code for the form
	*/
	function putCrudNoForm($name,$value=NULL){		
		switch ($name['form']){
			case "input":
				return "<u>$value</u>";
				break;
			case "select":
				return "<u>".$this->selectTag[$name['formname']][$value]."</u>";
				break;
			case "password":
				return "------------";
				break;
			default:
				break;
		}
	}
	
	/**
	* Api for setting for printing the crud table
	* @access public
	* @param array $set its a record set for a sql tablet
	* @return string with the html code for the table
	*/
	function crudCreateTable($set,$num){
		$formEdit="crudEdit";
		$var='<script LANGUAGE="JavaScript">
                        function confirmSubmit(user){
                                var agree=confirm("Estas Seguro(a) de querer borrar o editar el registro: " + user+ "?");
                                if (agree)
                                        return true ;
                                else
                                        return false ;
                        }
                </script>';
		$var.="<table border=\"0\" width=\"95%\" ><tr><td valign=\"top\" align=\"left\">\n";
		$var.="<a class=\"".$this->crudClass."button\" href=\"?action=$_GET[action]&crud=ADD\">Agregar</a></td>\n";
		$var.="<td valign=\"top\" align=\"right\" >".$this->crudSearchBar()."</td>";
		$var.="</tr></table>\n\n<hr/>";
		if($this->crudWarn){
			$var.="<div align=\"center\" class=\"warning\">$this->crudWarn</div>\n";
		}
		elseif($this->crudMesg){
			$var.="<div align=\"center\" class=\"$this->crudClass\">$this->crudMesg</div>\n";
		}
		else{
			$var.="<div align=\"center\"><span class=\"$this->crudClass\">$this->crudTableTitle ($num) </span></div>";
		}
		
		$var.="<br><table  width=\"95%\" class=\"".$this->crudClass."\"><tr>\n";
		foreach($this->crudTh as $value){
			if($value['width'])$width='width="'.$value["width"].'"';
			else $width=NULL;
			if(!$value["hidden"]){
				$var.="<th $width >$value[name]</th>\n";
				$hide[]=FALSE;
			}
			else $hide[]=TRUE;
		}
		$var.="<th colspan=\"3\"></th></tr>\n";
		$flag=0;
		while($line=$set->FetchRow()){
			if($flag==0){
				$flag=1;
				$class="even";
			}
			else{
				$flag=0;
				$class="odd";
			}
			$var.="<tr class=\"$class\">\n";
			$var.= '<form method="POST" action=?action='.$_GET['action'].'>';
			$var.='<input type="hidden" name="'.$_GET['action'].'" value="'.$formEdit.'">';
			$var.="\n".$this->html->hiddenTag("$formEdit/key",$line[$this->crudKey])."\n";
			for($i=0;$i<count($line)/2;$i++){
				//if(!($this->isHidden($hide[$i]))){
				if(!$hide[$i]){
					$var.="<td class=\"$class\">$line[$i]</td>\n";
				}
			}
			$array=array("value"=>"1","title"=>"Ver");
			$var.="<td class=\"$class\">".$this->html->imageTag("data[$formEdit][view]","images/buttons/view.gif",$array)."</td>\n";
			$array=array("onclick"=>"return confirmSubmit('".$line[0]."')","value"=>"1","title"=>"Editar");
			$var.="<td class=\"$class\">".$this->html->imageTag("data[$formEdit][edit]","images/buttons/edit.png",$array)."</td>\n";
			$array=array("onclick"=>"return confirmSubmit('".$line[0]."')","value"=>"1","title"=>"Borrar");
			$var.="<td class=\"$class\">".$this->html->imageTag("data[$formEdit][drop]","images/buttons/delete.png",$array)."</td>\n";
			$var.="</form></tr>\n\n";
		}
		$var.= "</table><br>\n\n";
		$var.="<table border=\"0\" align=\"center\"><tr>\n";
		if($_SESSION['nxcrd']!=10){
			$var.="<td><a class=\"$this->crudClass\" href=\"?action=".$_GET['action']
				."&is=1&pvcrd=".$_SESSION['pvcrd']."\"><< Anterior</a></td>\n";
			$var.="<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>\n";
			$var.="<td><a class=\"$this->crudClass\" href=\"?action=".$_GET['action']."&is=1\">Inicio</a></td>\n";
			$var.="<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>";
		}

		$var.="<td><a class=\"$this->crudClass\" href=\"?action=".$_GET['action']."&is=1&nxcrd=".$_SESSION['nxcrd']
			."\">Siguiente >></a></td></tr></table>\n";
		return $var;
	}
	
	/**
	* Api for setting for printing the crud table
	* @access public
	* @param array $set its a record set for a sql tablet
	* @return string with the html code for the table
	*/
	function crudSimpleTable($set){
		$var.="<table  width=95% class=\"".$this->crudClass."\"><tr>\n";
		foreach($this->crudTh as $value){
			if($value['width'])$width='width="'.$value["width"].'"';
			else $width=NULL;
			//if(!($this->isHidden($value[name]))){
			if(!$value["hidden"]){
				$var.="<th $width >$value[name]</th>\n";
				$hide[]=FALSE;
			}
			else $hide[]=TRUE;
		}
		$var.="</tr>\n";
		$flag=0;
		while($line=$set->FetchRow()){
			if($flag==0){
				$flag=1;
				$class="even";
			}
			else{
				$flag=0;
				$class="odd";
			}
			$var.="<tr class=\"$class\">\n";
			for($i=0;$i<count($line)/2;$i++){
				//if(!($this->isHidden($hide[$i]))){
				if(!$hide[$i]){
					$var.="<td class=\"$class\">$line[$i]</td>\n";
				}
			}
			$var.="</tr>\n\n";
		}
		return $var;
	}
	
	/**
	* Api for setting for printing a screen indicatin no more records
	* @access private
	* @return string with a html code screen saying there is no more record
	*/
	function crudNoRecords(){
		$var="<table border=\"0\" width=\"95%\" height=\"58\" ><tr><td align=\"left\">\n";
		$var.="<a class=\"".$this->crudClass."button\" href=\"?action=$_GET[action]&crud=ADD\">Agregar</a></td>\n";
		if((!($_GET['pvcrd']))and(!($_GET['nxcrd']))){
			$var.='<tr><td align="center"><div class="warning">No hay registros en la base de datos</div></td></tr>';
		}
		else{
			$var.='<tr><td align="center"><div class="warning">No hay m&aacute;s registros en la base de datos</div></td></tr>';
			$var.="<tr><td><br></td></tr><tr><td align =\"center\">\n";
			$var.="<a class=\"$this->crudClass\" href=\"?action=".$_GET['action']."&pvcrd="
			.$_SESSION['pvcrd']."\"><< Anterior</a></td></tr></table>\n";
		}
		return $var;
	}
	
	/**
	* Api for preparing up a crud screen
	* @access public
	* @return string code for the html table or forms for crud operations
	*/
	function crudTable(){
		global $DB;	
		if($_GET['crud']=="ADD") return $this->crudAddShowForm();
		if($_GET['crud']=="PASS")return $this->crudChangePassShowForm();
		elseif ($this->crudFlag=="ADD") return $this->crudAddShowForm();
		elseif ($this->crudFlag=="EDIT") return $this->crudEditShowForm();
		elseif ($this->crudFlag=="PASS") return $this->crudChangePassShowForm();
		elseif ($this->crudFlag=="VIEW") return $this->crudViewRecord();
		elseif ($this->crudFlag=="NONE") return null;
		$size=10;
		$lowlimit=0;
		if($_GET['nxcrd']){
			$lowlimit=$_SESSION['nxcrd'];
			$_SESSION['pvcrd']=$_SESSION['nxcrd']-$size;
			$_SESSION['nxcrd']=$_SESSION['nxcrd']+$size;
		}
		elseif($_GET['pvcrd']){
			$lowlimit=$_SESSION['pvcrd'];
			$_SESSION['nxcrd']=$_SESSION['pvcrd']+$size;
			$_SESSION['pvcrd']=$_SESSION['pvcrd']-$size;
		}
		else{
			$_SESSION['nxcrd']=0;
			$_SESSION['pvcrd']=0;
			$lowlimit=0;
		}
		if($_GET['is'])	$this->crudWhere=$_SESSION['WHERE'];
		elseif(!($_POST)){
			$_SESSION['WHERE']=NULL;
			$_SESSION['ITEM']=NULL;
		}
		$order_clause="ORDER BY ".$this->crudOrderBy." ";
		$query="select * from  ".$this->crudTable." $this->crudWhere $order_clause ";
		$set=$this->doQuery($query);
		$num=$this->doCounts($set);
		$total=$num[1];
		$set=$this->DB->SelectLimit($query,$size,$lowlimit);
		$num=$this->doCounts($set);
		if($_SESSION['nxcrd']==0)$_SESSION['nxcrd']=10;
		if(!($num[1]>0))return $this->crudNoRecords();
		return $this->crudCreateTable($set,$total);
	}

	function crudForm($data){
		$formName="crud";
		switch ($_POST['do']){	
			case "search":
				if($data['field']=="all"){
					$this->crudWhere=NULL;
					foreach($this->crudTh as $value){
						if(!$value["hidden"]){
							if(!($this->crudWhere))$this->crudWhere="WHERE ";
							else $this->crudWhere.=" OR ";
							//$this->crudWhere.=$value['insert']." LIKE '%".$data['item']."%' ";
							$this->crudWhere.="REGEXP_LIKE($value[insert],'$data[item]','i')";
						}
					}
				}
				else $this->crudWhere="WHERE $data[field] LIKE '%".$data['item']."%' ";
				$_SESSION['WHERE']=$this->crudWhere;
				$_SESSION['ITEM']=$data['item'];
				return NULL;
				break;
			case "add":
				break;
		}
	}


	/**
	* Api for preparing up a crud search Bar
	* @access public
	* @return string code for the html search bar
	*/
	function crudSearchBar(){
		$formName="crud";
		$array=array("all"=>"todos");
		foreach($this->crudTh as $value){
			if(!$value["hidden"]){
				$array[$value['insert']]=$value['name'];
			}
		}
		$var.='<form method="POST" name="algo" action="?action='.$_GET['action'].'">';
		$var.='<input type="hidden" name="'.$_GET['action'].'" value="'.$formName.'">';
		$var.='<input type="hidden" name="do" value="search">';
		$var.='<label class="crudsearch" for="search">B&uacute;squeda:&nbsp;</label>';
		$attribs=array("class"=>"crud","value"=>$_SESSION['ITEM']);
		$var.=$this->html->inputTag("$formName/item",20,$attribs)."&nbsp;";
		$attribs=array("class"=>"crud");
		$var.=$this->html->selectTag("$formName/field",$array,"all",$attribs,$attribs);
		$var.=$this->html->submitTag("Buscar");
		$var.='</form>';
		return $var;
	}

	
	/**
	* Api for preparing up a crud screen change password
	* @access public
	* @return string code for the html table or forms for crud operations
	*/
	function crudChangePassShowForm(){
		if($_GET['user']){
			$this->crudRecordKey=$_GET['user'];
		}		
		$formName="crudEdit";
		$var="<div align=\"left\" style=\"margin-left:40px;\">\n";
		$var.="<a class=\"".$this->crudClass."button\" href=\"?action=$_GET[action]&crud=BACK\">\n";
		$var.="Regresar</a></div>\n";
		if($this->crudWarn)$var.="<div class=\"warning\">$this->crudWarn</div>\n";
		elseif($this->crudMesg)$var.="<div class=\"$this->crudClass\">$this->crudMesg</div>\n";
		else $var.="<br><br>";
		$array=array("class"=>$this->crudClass);
		$var.='<form method="POST" action=?action='.$_GET['action'].'>';
		$var.='<input type="hidden" name="data['.$formName.'][exec]" value="2">';
		$var.='<input type="hidden" name="'.$_GET['action'].'" value="'.$formName.'">';
		//$var.="\n".$this->html->hiddenTag("$formName/user",$this->crudRecordKey)."\n";
		$var.="\n<br>\n<fieldset class=$this->crudClass>\n";
		$var.="<legend class=\"$this->crudClass\">Cambio de password para: <u>$this->crudRecordKey</u> </legend>\n";
		$var.="<table  border=\"0\" cellpadding=\"3\" cellspacing=\"3\" width=\"60%\">\n";
		$var.="<tr><td align=\"right\"><label  for=\"Password\">\n";
		$var.="Password:</label></td>\n";
		$var.="<td align=\"center\">".$this->html->passwordTag("$formName/pass1","",$array);
		$var.="</td></tr>\n";
		$var.="\n<tr><td align=\"right\"><label  for=\"Password\">\n";
		$var.="Repetir&nbsp;Password:</label></td>\n";
		$var.="\n<td align=\"center\">".$this->html->passwordTag("$formName/pass2","",$array);
		$var.="</tr></table>\n\n";
		$array=array("class"=>$this->crudClass."button");
		$var.="<br><div align=\"center\">".$this->html->submitTag("Cambiar!",$array)."</div>\n";
		$var.="</fieldset></form>\n";
		return $var;
	}

	/**
	* Api for preparing up a crud screen view record
	* @access public
	*/
	function crudViewRecord(){
		$line=$this->crudLine;
		$formName="crudEdit";
		$var="<div align=\"left\" style=\"margin-left:0px;\">";
		$var.="<a class=\"".$this->crudClass."button\" href=\"?action=$_GET[action]&crud=BACK\">\n";
		$var.="Regresar</a></div>\n";
		if($this->crudWarn)$var.="<div class=\"warning\">$this->crudWarn</div>\n";
		elseif($this->crudMesg)$var.="<div class=\"$this->crudClass\">$this->crudMesg</div>\n";
		$var.='<form method="POST" action=?action='.$_GET['action'].'>';
		$var.="<br><fieldset class=$this->crudClass>\n";
		$var.="<legend class=\"$this->crudClass\">$this->crudTableTitle</legend>\n";
		$var.="\n<table border=\"0\" cellpadding=\"3\" cellspacing=\"3\">\n";
		$flag=0;
		foreach($this->crudTh as $value){
			if(!$value['hiddenForm'])
			{
				if($flag==0){
					$content=$line[$value['name']];
					$flag=1;
					$var.="<tr><td align=\"right\">$value[name]: </td>\n";
					$var.="<td align=\"left\">".$this->putCrudNoForm($value,$content)."</td>";
					$var.="\n<td>&nbsp;</td>\n";
				}
				else{	
					$content=$line[$value['name']];
					$flag=0;
					$var.="<td align=\"right\">$value[name]:</label></td>\n";
					$var.="<td align=\"left\">".$this->putCrudNoForm($value,$content)."</td>";
					$var.="</td></tr>\n";
				}
			}
		}
		$var.="\n\n</table>\n";
		$var.="<br></fieldset></form>\n";
		return $var;
	}

	/**
	* Api for preparing up a crud screen Edit form
	* @access public
	*/
	function crudEditShowForm(){
		$line=$this->crudLine;
		$formName="crudEdit";
		$var="<div align=\"center\"> <div align=\"left\" style=\"margin-left:0px;\">";
		$var.="<a class=\"".$this->crudClass."button\" href=\"?action=$_GET[action]&crud=BACK\">\n";
		$var.="Regresar</a></div>\n";
		if($this->crudWarn)$var.="<div class=\"warning\">$this->crudWarn</div>\n";
		elseif($this->crudMesg)$var.="<div class=\"$this->crudClass\">$this->crudMesg</div>\n";
		$var.='<form method="POST" action=?action='.$_GET['action'].'>';
		$var.="<br><fieldset class=$this->crudClass>\n";
		$var.="<legend class=\"$this->crudClass\">$this->crudEditTitle</legend>\n";
		$var.="\n<table border=\"0\" cellpadding=\"3\" cellspacing=\"3\">\n";
		$var.='<input type="hidden" name="'.$_GET['action'].'" value="'.$formName.'">';
		$var.='<input type="hidden" name="data['.$formName.'][exec]" value="1">';		
		$flag=0;
		foreach($this->crudTh as $value){
			if(!$value['hiddenForm'])
			{
				if($flag==0){
					$content=$line[$value['name']];
					$flag=1;
					$var.="<tr><td align=\"right\">$value[name]: </td>\n";

					/* FXAH - 14.09.06 If we correctly set up the hidden field flags, this
					 * shouldn't be necessary
					 */

					/*
					if($this->crudRecordKey==$content){
						$var.="<td align=\"center\"><div class=\"".$this->crudClass."Key\"><u>$content</u></div></td>";
					}
					else $var.="<td align=\"center\">".$this->putCrudForm($value,$formName,$content)."</td>";
					*/
					$var.="<td align=\"center\">".$this->putCrudForm($value,$formName,$content)."</td>";
					
					$var.="\n<td>&nbsp;</td>\n";
				}
				else{	
					$content=$line[$value['name']];
					$flag=0;
					$var.="<td align=\"right\">$value[name]:</label></td>\n";

					/*
					if($this->crudRecordKey==$content){
						$var.="<td align=\"center\"><div class=\"".$this->crudClass."Key\"><u>$content</u></div></td>";
					}
					else $var.="<td align=\"center\">".$this->putCrudForm($value,$formName,$content)."</td>";
					*/
					$var.="<td align=\"center\">".$this->putCrudForm($value,$formName,$content)."</td>";
					$var.="</td></tr>\n";
				}
			}
		}
		$var.="\n\n<tr><td colspan=\"5\">\n";
		$array=array("class"=>$this->crudClass."button");
		$var.="<br><div align=\"right\" > ";
		$var.=$this->html->submitTag("Aceptar",$array);
		$var.="</td><tr></table></div></fieldset></form><div>\n";	
		return $var;
	}

	/**
	* Api for preparing up a crud screen Add form
	* @access public
	*/
	function crudAddShowForm(){
		$line=$this->crudLine;
		$formName="crudAdd";
		$var="<div align=\"center\"><div align=\"left\" style=\"margin-left:0px;\">";
		$var.="<a class=\"".$this->crudClass."button\" href=\"?action=$_GET[action]&crud=BACK\">\n";
		$var.="Regresar</a></div>\n";
		if($this->crudWarn)$var.="<div class=\"warning\">$this->crudWarn</div>\n";
		elseif($this->crudMesg)$var.="<div class=\"$this->crudClass\">$this->crudMesg</div>\n";
		$var.='<form method="POST" action=?action='.$_GET['action'].'>';
		$var.="<br><fieldset class=$this->crudClass>\n";
		$var.="<legend class=\"$this->crudClass\">$this->crudFormTitle</legend>\n";
		$var.="\n<table border=\"0\" cellpadding=\"3\" cellspacing=\"3\">\n";
		$var.='<input type="hidden" name="'.$_GET['action'].'" value="'.$formName.'">';
		$flag=0;
		foreach($this->crudTh as $value){
			/* FXAH - 13.09.06
			 * Added an isHidden check
			 */
			//if(!$this->isHidden($value['name']))
			if(!$value["hiddenForm"] && $value["form"]!="noop")
			{
				if($flag==0){
					$content=$line[$value['name']];
					$flag=1;
					$var.="<tr><td align=\"right\">$value[name]:</td>\n";
					$var.="<td>".$this->putCrudForm($value,$formName,$content);
					$var.="</td>\n<td>&nbsp;</td>\n";
				}
				else{	
					$content=$line[$value['name']];
					$flag=0;
					$var.="<td align=\"right\">$value[name]:</td>\n";
					$var.="<td>".$this->putCrudForm($value,$formName,$content);
					$var.="</td></tr>\n";
				}
			}
		}
		$var.="\n\n<tr><td colspan=\"5\">\n";
		$array=array("class"=>$this->crudClass."button");
		$var.="<br><div align=\"right\" > ";
		$var.=$this->html->submitTag("Aceptar",$array);
		$var.="</td><tr></table></div></fieldset></form></div>\n";
		return $var;
	}

	
	/**
	* Api for preparing the Edit Form
	* @access private
	* @return bool flase is failed true if successfull
	*/
	function crudPrepareEditForm($post=NULL){
		if(!($post)){
			for($i=0;$i<count($this->crudTh);$i++){
				$select.=$this->crudTh[$i]['insert'].",";
			}
			$select = substr($select, 0, -1);//removing last ,
			$query="select $select from $this->crudTable where ".$this->crudKey."='$this->crudRecordKey'";
			if(!($set=$this->doQuery($query))){
				$this->crudWarn="Error CEF-L-01 no puedo editar";
				return false;
			}
			$line=$set->FetchRow();
			for($i=0;$i<count($this->crudTh);$i++){
				$this->crudLine[$this->crudTh[$i]['name']]=$line[$i];
			}
		}		
		else{
			for($i=0;$i<count($this->crudTh);$i++){
				if($this->crudTh[$i]['insert']!=$this->crudKey){
					$this->crudLine[$this->crudTh[$i]['name']]=$post[$this->crudTh[$i]['formname']];
				}
				else $this->crudLine[$this->crudTh[$i]['name']]=$this->crudRecordKey;
			}
		}
		return true;
	}
	
	/**
	* Api for proccessing up a crud edit form after submission
	* @access public
	* @return void
	*/
	function crudEditForm($post){
		if($post['edit']){
			$this->crudFlag="EDIT";
			$this->crudRecordKey=$post['key'];
			$_SESSION['KEYUSER']=$post['key'];
			if(!($this->crudPrepareEditForm()))return NULL;
		}
		elseif($post['exec']==1){
			$this->crudFlag="EDIT";
			$this->crudRecordKey=$_SESSION['KEYUSER'];

			/* FXAH - 14.09.06 It's no longer necessary to validate empty fields
			 * as the optional field flag now exists. crudValidate takes care of
			 * empty/optional fields
			 */

			/* 
			foreach($post as $key => $value){
				if($value==NULL){
					if(!($this->crudPrepareEditForm($post)))return NULL;
					$this->crudWarn="Favor de llenar todos los datos";
					return NULL;
				}
			}
			*/
			
			if(!($this->crudValidate($post))) {
				if(!($this->crudPrepareEditForm($post)))return NULL;
				return NULL;
			}
			$line=split(",",$this->crudInsert);
			for($i=0;$i<count($this->crudTh);$i++){
				if(strcasecmp($this->crudKey, $line[$i]) && $this->crudPassField!=$line[$i]){
					$values.=" $line[$i]='".$post[$this->crudTh[$i]['formname']]."',";
				}
			}
			$values=$rest = substr($values, 0, -1);//removing last ,
			
			$query="UPDATE $this->crudTable SET $values  \n 
					WHERE $this->crudKey='$this->crudRecordKey'";
			
			if(!($this->doQuery($query))){
				if(!($this->crudPrepareEditForm($post)))return NULL;
				$this->crudWarn="Error al Modificar, Talvez ya existe el registro.";
				return NULL;
			}
			else{
				$this->crudFlag="";
				$this->crudMesg="Registro: <u>$post[key]</u> Modificado Exitosamente!";
				return NULL;
			}
		}
		elseif($post['exec']==2){
			$this->crudFlag="PASS";
			$this->crudRecordKey=$_SESSION['KEYUSER'];
			if((!($post['pass1'])) or (!($post['pass2']))){
				$this->crudWarn="Tienes que llenar los dos passwords";
				return NULL;
			}
			if($post['pass1']!=$post['pass2']){
				$this->crudWarn="Los passwords no coinciden";
				return NULL;
			}
			$pass=md5($post['pass1']);
			$query="UPDATE $this->crudTable  SET $this->crudPassField='$pass' where $this->crudKey='$this->crudRecordKey'";
			if((!$this->doQuery($query))){
				$this->crudWarn="Error CEF-L-01-2 No pude cambiar el password";
				return NULL;
			}
			else{
				$this->crudFlag="";
				$this->crudMesg="Registro: <u>$post[key]</u> Modificado Exitosamente!";
				return NULL;
			}
		}
		elseif($post['drop']) {
			$query="delete from ".$this->crudTable." where ".$this->crudKey."='".$post['key']."'";
			if(!($this->doQuery($query))){
				$url=URL."?action=".$_GET[action];
				$link="<a href=\"$url\">Continuar...</a>";
				$warning="<div class=\"warning\">Error CEF-L-02 no pude borrar. $link.</div>";
				$this->html->flashText($warning);
			}
			$this->crudMesg="Registro: <u>$post[key]</u> Borrado Exitosamente!";
		}
		elseif($post['view']){
			$this->crudFlag="VIEW";
			$this->crudRecordKey=$post['key'];
			$_SESSION['KEYUSER']=$post['key'];
			if(!($this->crudPrepareEditForm()))return NULL;
		}
		return NULL;
	}

	
	/**
	* Api for printing up a crud message box
	* @access public
	*/
	function crudMessage(){
		return "<div align=\"center\" class=\"$this->class\">".$this->crudMesg."<div>";
	}


	/**
	* Api for preparing the ADD Form
	* @access private
	* @return bool flase is failed true if successfull
	*/
	function crudPrepareAddForm($post=NULL){
		if(!($post)){
			
			$query="select * from $this->crudTable where ".$this->crudKey."='$this->crudRecordKey'";
			if(!($set=$this->doQuery($query))){
				$this->crudWarn="Error CEF-L-01 no puedo editar";
				return false;
			}
			$line=$set->FetchRow();
			for($i=0;$i<count($this->crudTh);$i++){
				$this->crudLine[$this->crudTh[$i]['name']]=$line[$i];
			}
		}		
		else{
			for($i=0;$i<count($this->crudTh);$i++){
				if($this->crudTh[$i]['insert']!=$this->crudPassField){
					$this->crudLine[$this->crudTh[$i]['name']]=$post[$this->crudTh[$i]['formname']];
				}
			}
		}
		return true;
	}
	
	/**
	* Api for proccessing up a crud add form after submission
	* @access public
	*/	
	function crudAddForm($post){
		$this->crudFlag="ADD";

		/* FXAH - 13.09.06 Adding the optional field flag makes this
		 * check unnecessary as crudValidate can decide wether a field
		 * requires to be entered or not
		 */
		/*
		foreach($post as $key => $value){
			if($value==NULL){
				if(!($this->crudPrepareAddForm($post)))return NULL;
				$this->crudWarn="Favor de llenar todos los datos";
				return NULL;
			}
		}
		*/
		if(!($this->crudValidate($post))) {
			if(!($this->crudPrepareAddForm($post))) return NULL;
			return NULL;
		}

		/* FXAH - 14.09.06 In a common database environment, keys don't need to
		 * be inserted, as they are created by means of triggers or serial datatypes
		 * so we check if the [$i] field equals the defined key and if so, we don't
		 * include it in the query (values and insertable fields).
		  */
		$values="";
		$insertable="";
		for($i=0;$i<count($this->crudTh);$i++){
			if(strcasecmp($this->crudTh[$i]['insert'], $this->crudKey) AND ($this->crudTh[$i]["form"]!="noop"))
			{
				//echo ">> ".$this->crudTh[$i]["form"]."<<";
				$values.="'".$post[$this->crudTh[$i]['formname']]."',";
				$insertable.=$this->crudTh[$i]['insert'].",";
			}
		}
		
		$values=$rest = substr($values, 0, -1);//removing last ,
		$insertable=substr($insertable, 0, -1);//removing last ,
		
		
		//$query="INSERT INTO $this->crudTable ($this->crudInsert) values($values)";
		$query="INSERT INTO $this->crudTable ($insertable) VALUES ($values)";
		//echo $query;
		if(!($this->doQuery($query))){
			$this->crudWarn="Error al Insertar, Talvez ya existe el registro";
			return NULL;
		}
		else{
			$this->crudMesg="Dado de Alta Exitosamente!";
			return NULL;
		}
	}
	
	
	/*
	*Api for validating ADD and EDIT forms
	*
	*/
	function crudValidate($post){
		if(!($this->crudValidate))return FALSE;
		for($i=0;$i<count($this->crudTh);$i++){
			$value=$post[$this->crudTh[$i]['formname']];
			if(strlen($value) || !$this->crudTh[$i]['optionalfield'])
			{
				switch ($this->crudTh[$i]['validate']){
					case "string":
						if(!is_string($value) || !strlen($value)){
							$this->crudWarn="El campo 
								\"" . $this->crudTh[$i]['name'] . "\" 
								no es opcional y esta vac&iacute;o ($value)";
							return false;
							}
						break;
					case "email":
						if(!($this->html->validateMail($value))){
							$this->crudWarn="Email en formato incorrecto";
							return false;
						}
						break;
					case "int":
						if(!($this->html->validateNum($value))){
							$this->crudWarn="El campo 
								\"" . $this->crudTh[$i]['name'] . "\" 
								s&oacute;lo acepta n&uacute;meros ($value)";
							return false;
						}
						break;
					case "date":
						/*if(!($this->html->validateDate($value))){
							$this->crudWarn="La fecha es incorrecta";
							return false;
						}*/
						break;
					case "zip":
						if(!($this->html->validateZip($value))){
							$this->crudWarn="El c&oacute;digo postal consta de cinco digitos";
							return false;
						}
						break;
					case "alpha":
						if(!($this->html->validateAlpha($value))){
							$this->crudWarn="El campo
								\"" . $this->crudTh[$i]['name'] . "\"
								s&oacute;lo acepta caracteres de la A a la Z
								";
							return false;
						}
						break;
					case "phone":
						if(!($this->html->validatePhone($value))){
							$this->crudWarn="El campo
								\"" . $this->crudTh[$i]['name'] . "\"
								s&oacute;lo acepta n&uacute;meros y guiones y es obligatorio.
								";
							return false;
						}
						break;
				}
			}
		}
		return true;
	}
}
//END OF CLASS
?>
