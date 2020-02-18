<?
/*
* This is a "helper" class of the snfw framework Its based on the CAKE FRAMEWORK as its uses many methods created by their developers
* So this package is made by various contributors and Securenet
* @author Original  The cake framework developers  Extended by SecureNet 
* @version 0.1
* @package snfw
* @subpackage snfw.libs
* @filesource
*/

/**
 * Object htmlAssistant, parent class of the whole aspect of the Model in MVC in this framework.
 *
 * @package snfw
 * 
 */
class htmlAssistant{
	/**
        * Main crums array. Private used interally
        * @access private
        * @var array
        */
	var $_crumbs = array();
	/**
        * base, used interally. URL of the Site.
        * @access public
        * @var string
        */
	var $base = null;
	/**
        * here, used internally. ROOT of the framework.
        * @access public 
        * @var string
        */
	var $here = null;
	/**
        * params array used internally
        * @access private
        * @var array
        */
	var $params = array();
	/**
        * string action, used internally.
        * @access private
        * @var string
        */
	var $action = null;
	/**
        * data string, used internally
        * @access private
        * @var string
        */
	var $data = null;
	/**
        * model string used internally
        * @access private
        * @var string
        */
	var $model = null;
	/**
        * field string used internally
        * @access private
        * @var string
        */
	var $field = null;


	/**
	  *Constructor for this class
	  *sets must variables
	  *@returns void
	  */
	function htmlAssistant($controller=""){
		global $URL;
		$this->base=$URL;
		$this->here="$URL?action=$controller";
		$this->params['controller']=$controller;
	}

	/**
	 * Returns an URL for a combination of controller and action.
	 * @access public
	 * @param string $err Text of the error
	 * @param string $action file exectued when clicking the continue button
	 */	
	function displayError($err=NULL,$action=NULL){
		echo "<html><body><h1>$err</h1>";
		echo "<form method='post' action='$this->base/index.php'>";
		echo "<input type='hidden' name='action' value='$action'";
		echo "<input type='submit' value='Continuar'></form></body></html>";
	}	
	/**
	 * Returns an URL for a combination of controller and action.
	 * @access private
	 * @param string $url
	 * @return string Full constructed URL as a string.
	 */
	function urlFor($url=null){
		if (empty($url)){
			return $this->here;
		}
		elseif ($url[0] == '/'){
			$out = $this->base . $url;
		}
		else{
			$out = $this->base . '/' . strtolower($this->params['controller']) . '/' . $url;
		}
		return ereg_replace('&([^a])', '&amp;\1', $out);
	}
	/**
	 * Returns a space-separated string with items of the $options array.
	 * @access private
	 * @param array $options Array of HTML options.
	 * @param string $insert_before
	 * @param unknown_type $insert_after
	 * @return string
	 */
	function parseHtmlOptions($options, $exclude=null, $insert_before=' ', $insert_after=null){
		if (!is_array($exclude)) $exclude = array();
		if (is_array($options)){
			$out = array();
			foreach ($options as $k=>$v){
				if (!in_array($k, $exclude)){
					$out[] = "{$k}=\"{$v}\"";
				}
			}
			$out = join(' ', $out);
			return $out? $insert_before.$out.$insert_after: null;
		}
		else{
			return $options? $insert_before.$options.$insert_after: null;
		}
	}

	/**
	 * Returns a formatted FILE tag for HTML FORMs.
	 *
	 * @param string $tagName If field is to be used for CRUD, this should be modelName/fieldName
	 * @param array $htmlOptions 
	 * @return string The formatted INPUT element
	 */
	function uploadTag($tagName,$htmlOptions,$maxfilesize=20000){
		$this->setFormTag($tagName);
		!strlen($htmlOptions['value'])? $htmlOptions['value'] = $this->tagValue($tagName): null;
		$returnstring="<input type=\"hidden\" name=\"MAX_FILE_SIZE\" value=\"$maxfilesize\" />";
		$returnstring.= sprintf(TAG_FILE, $this->model, $this->parseHtmlOptions($htmlOptions, null, '', ' '));
		return $returnstring;
	}
	
	
	/*
	*Moves an uploaded file form a temprorary position to a prermanente one
	*/
	function doUpload($formName,$dirname){		
		$uploadfile =$dirname."/".basename($_FILES[$formName]['name']);
		if(is_file($uploadfile))return false;
		if(@move_uploaded_file($_FILES[$formName]['tmp_name'], $uploadfile)) {
			return true;
		} 
		else {
			return false;
		}
	}
	
	
	function print_html_r( $array) {
		return nl2br( eregi_replace( " ", " ", print_r( $array, TRUE ) ) );   
	} 

	
	/**
	 * Returns an HTML FORM element. 
	 *
	 * @access public
	 * @param string $target URL for the FORM's ACTION attribute.
	 * @param string $type FORM type (POST/GET).
	 * @param array $html_options
	 * @return string An formatted opening FORM tag.
	 */
	function formTag($name=null,$target=null, $type='post', $html_options=null){
		$html_options['name']=$name;
		$html_options['method'] = $type=='get'? 'get': 'post';
		if(!($target))	$html_options['action'] = $this->UrlFor($target);
		else $html_options['action']=$target;		
		$type == 'file'? $html_options['enctype'] = 'multipart/form-data': null;
		$formstring=sprintf(TAG_FORM, $this->parseHtmlOptions($html_options, null, ''));
		$formstring=$formstring."\n<input type=\"hidden\" name=\"".$this->params['controller']."\" value=\"$name\">\n";
		return $formstring;
	}



	/**
	 * Returns a SELECT element, 
	 * @acess public
	 * @param string $tagName Name attribute of the SELECT
	 * @param array $option_elements Array of the OPTION elements (as 'value'=>'Text' pairs) to be used in the SELECT element
	 * @param array $select_attr Array of HTML options for the opening SELECT element
	 * @param array $option_attr Array of HTML options for the enclosed OPTION elements 
	 * @return string Formatted SELECT element
	 */

	function selectTag($tagName, $option_elements, $selected=null, $select_attr=null, $option_attr=null){
		$this->setFormTag($tagName);
		if (!is_array($option_elements) || !count($option_elements))return null;
		$select[] = sprintf(TAG_SELECT_START, $this->model, $this->field, $this->parseHtmlOptions($select_attr));
		//$select[] = sprintf(TAG_SELECT_EMPTY, $this->parseHtmlOptions($option_attr));
		foreach ($option_elements as $name=>$title){
			$options_here = $option_attr;
			if ($selected == $name)$options_here['selected'] = $selected;
			$select[] = sprintf(TAG_SELECT_OPTION, $name, $this->parseHtmlOptions($options_here), $title);
		}
		$select[] = sprintf(TAG_SELECT_END);
		return implode("\n", $select);
	}

	/**
	 * Returns a SELECT element, 
	 * @acess public
	 * @param string $tagName Name attribute of the SELECT
	 * @param array $select_attr Array of HTML options for the opening SELECT element
	 * @param array $option_attr Array of HTML options for the enclosed OPTION elements 
	 * @return string Formatted SELECT element
	 */
	function countryTag($tagName,$selected=NULL,$select_attr=NULL,$option_attr=NULL){
		require_once("countryList.php");
		return $this->selectTag($tagName,$CountryList,$selected,$select_attr,$option_attr);
	}

	
	/**
	 * Returns an INPUT element with type="hidden".
	 *
	 * @param string $tagName
	 * @param string $value
	 * @param array $html_options
	 * @return string
	 */
	function hiddenTag($tagName, $value="", $html_options=null){
		/* FXAH - 14.02.06
		   changed the default $value from null to "" and the
		   comparisson now uses strlen. A value of 0 would
		   cause this code to send an empty value - dangerous
		   for DB keys.
		  */
		$this->setFormTag($tagName);
		$html_options['value'] = strlen($value)? $value: $this->tagValue($tagName);
		return sprintf(TAG_HIDDEN, $this->model, $this->field, $this->parseHtmlOptions($html_options, null, '', ' '));
	}

	
	/**
	 * Returns a form Tag, 
	 * @acess private
	 * @return string
	 */
	function setFormTag($tagValue){
		return list($this->model, $this->field) = explode("/", $tagValue);
	}

	/*
	*Retruns a closign form tag
	*@acces public
	*@return string
	*/
	function closeFormTag(){
		return "</form>";
	}

	 /**
         * Returns a formatted INPUT RADIO tag for HTML FORMs.
         *
         * @param string $tagName If field is to be used for CRUD, this should be modelName/fieldName
         * @param value attribute for RADIO element
         * @param array $htmlOptions
         * @return string The formatted INPUT RADIO element
         */
	function radioTag($tagName,$value,$htmlOptions=null){
		$this->setFormTag($tagName);
		$htmlOptions['value'] = $value;
		!strlen($htmlOptions['value'])? $htmlOptions['value'] = $this->tagValue($tagName): null;
		return sprintf(TAG_RADIOS, $this->model, $this->field, $this->parseHtmlOptions($htmlOptions, null, '', ' '));
	}

         /**
         * Returns a formatted CHECKBOX tag for HTML FORMs.
         *
         * @param string $tagName If field is to be used for CRUD, this should be modelName/fieldName
         * @param value attribute for CHECKBOX element
         * @param array $htmlOptions
         * @return string The formatted CHECKBOX element
         */
        function checkBoxTag($tagName,$value,$htmlOptions=null){
                $this->setFormTag($tagName);
                $htmlOptions['value'] = $value;
                !strlen($htmlOptions['value'])? $htmlOptions['value'] = $this->tagValue($tagName): null;
                return sprintf(TAG_CHECKBOX, $this->model, $this->field, $this->parseHtmlOptions($htmlOptions, null, '', ' '));
        }

	/**
	 * Returns a formatted SUBMIT button for HTML FORMs.
	 * @access public
	 * @param string $caption Text on SUBMIT button
	 * @param array $html_options HTML options
	 * @return string The formatted SUBMIT button
	 */
	function submitTag($caption='Submit', $htmlOptions=null,$name="Submit"){
		//$htmlOptions['name'] = $name;
		$htmlOptions['value'] = $caption;
		return sprintf(TAG_SUBMIT, $this->parseHtmlOptions($htmlOptions, null, '', ' '));
	}


	function submitTag2($caption='Submit', $htmlOptions=null,$name="Submit"){
		$htmlOptions['name'] = $name;
		$htmlOptions['value'] = $caption;
		return sprintf(TAG_SUBMIT, $this->parseHtmlOptions($htmlOptions, null, '', ' '));
	}

	/**
	 * Returns a formatted INPUT tag for HTML FORMs.
	 *
	 * @param string $tagName If field is to be used for CRUD, this should be modelName/fieldName
	 * @param int $size Size attribute for INPUT element
	 * @param array $htmlOptions 
	 * @return string The formatted INPUT element
	 */
	function inputTag($tagName,  $size=20, $htmlOptions=null,$value=null){
		$this->setFormTag($tagName);
		$htmlOptions['size'] = $size;
		if($value)$htmlOptions['value']=$value;
		!strlen($htmlOptions['value'])? $htmlOptions['value'] = $this->tagValue($tagName): null;
		return sprintf(TAG_INPUT, $this->model, $this->field, $this->parseHtmlOptions($htmlOptions, null, '', ' '));

	}

        /**
	* Returns a formatted INPUT tag for HTML FORMs.
	*
	* @param string $tagName If field is to be used for CRUD, this should be modelName/fieldName
	* @param int $size Size attribute for INPUT element
	* @param array $htmlOptions
	* @return string The formatted INPUT element
	*/
	function areaTag($tagName,  $cols=5,$rows=5, $htmlOptions=null){
		$this->setFormTag($tagName);
		$htmlOptions['cols'] = $cols;
		$htmlOptions['rows'] = $rows;
		$value=$htmlOptions['value'];
		!strlen($htmlOptions['value'])? $htmlOptions['value'] = $this->tagValue($tagName): null;
		return sprintf(TAG_AREA, $this->model, $this->field, $this->parseHtmlOptions($htmlOptions, null, '', ' '),$value);
	}

        /**
	* Returns a formatted IMAGE TAG for forms.
	*
	* @param string $imageName name of image
	* @param int $height 	* @param array $width of image
	* @return string The formatted INPUT element
	*/
	function imageTag($imageName, $src, $htmlOptions=null){
		$this->setFormTag($imageName);
		$htmlOptions['src']=$src;
		return sprintf(TAG_IMAGE_INPUT, $this->model, $this->field, $this->parseHtmlOptions($htmlOptions, null,'',''));
	}


																		       
	
	/**
	 * Returns an INPUT element with type="password".
	 *
	 * @param string $tagName
	 * @param int $size
	 * @param array $html_options
	 * @return string
	 */
	function passwordTag($tagName, $size=20, $htmlOptions=null){
		$this->setFormTag($tagName);
		$htmlOptions['size'] = $size;
		empty($htmlOptions['value'])? $htmlOptions['value'] = $this->tagValue($tagName): null;
		return sprintf(TAG_PASSWORD, $this->model, $this->field, $this->parseHtmlOptions($htmlOptions, null, '', ' '));
	}

	/**
	 * Returns value of $tagName. False is the tag does not exist.
	 *
	 * @param string $tagName
	 * @return unknown Value of the named tag.
	 */
	function tagValue ($tagName){      
		$this->setFormTag($tagName);
		return isset($this->params['data'][$this->model][$this->field])? $this->params['data'][$this->model][$this->field]: false;
	}
	/**
	 * Returns false if given FORM field has no errors. Otherwise it returns the constant set in the array Model->validationErrors.
	 *
	 * @param unknown_type $field
	 * @return unknown
	 */
	function tagIsInvalid ($model, $field){
		return "";
		//return empty($this->validationErrors[$model][$field])? 0: $this->validationErrors[$model][$field];
	}

	/**
	 * Returns true if given FORM field has no validation errors. 
	 *
	 * @param 
	 * @return bool
	 */
	function validateTypes($array){
		foreach ($array as $key => $value){
			if(isset($array[$key])){
				switch ($value){
					case "int":
						if(!(is_numeric($array[$key]))) return false;
					case "string":
						if(!(is_string($array[$key]))) return false;
					case "email":
						if(!preg_match("/\@/", $array[$key]))return false;
				}
			}
		}
		return true;
	}

	/**
	 * Returns true if given FORM field has no validation errors. 
	 *
	 * @param 
	 * @return bool
	 */
	function validateErrors($array,$except=NULL){
		$exceptarr=split(",",$except);
		if(is_array($exceptarr)){
			foreach ($exceptarr as $value) unset($array[$value]);
		}
		foreach ($array as $value)if (!($value)) return false;
		return true;
	}
	/**
	 * Returns true if given GET structure has no validation errors. 
	 * @param array $get Array of the get elements (as 'id'=>'int' pairs or 'name'=>'string') to be used
	 * @return bool
	 */
	function validateGets($array){
		foreach ($array as $key => $value){
			if(isset($_GET[$key])){
				switch ($value){
					case "int":
						if(!is_numeric($_GET[$key])) $this->authError("FalseGet");
					case "string":
						if(!(is_string($_GET[$key]))) $this->authError("FalseGet");
				}//endSwtich
			}//if
		}
		return true;
	}
	
	/**
	 * Returns true if email address is valid 
	 * @param string $email email address to validate
	 * @return bool
	 */
	function validateMail($email){
		$qtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
		$dtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
		$atom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c'.'\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
		$quoted_pair = '\\x5c\\x00-\\x7f';
		$domain_literal = "\\x5b($dtext|$quoted_pair)*\\x5d";
		$quoted_string = "\\x22($qtext|$quoted_pair)*\\x22";
		$domain_ref = $atom;
		$sub_domain = "($domain_ref|$domain_literal)";
		$word = "($atom|$quoted_string)";
		$domain = "$sub_domain(\\x2e$sub_domain)*";
		$local_part = "$word(\\x2e$word)*";
		$addr_spec = "$local_part\\x40$domain";
		return preg_match("!^$addr_spec$!", $email) ? 1 : 0;
	}

	
	/**
	 * Returns true if zip code  is valid 
	 * @param int $zip zip code to validate
	 * @return bool
	 */
	function validateZip($zip){
		if(strlen($zip)!=5)return false;
		if(!(is_numeric($zip))) return false;
		return true;
	}
	
	/**
	 * Returns true if parameter is number
	 * @param int $num number to validate
	 * @return bool
	 */
	function validateNum($num){
		if(!(is_numeric($num))) return false;
		return true;
	}


	/**
	 * Returns true if sex is valid m for male and f for female
	 * @param string $sex sex to validate
	 * @return bool
	 */
	function validateSex($sex){
		$tmp=strtolower($sex);
		if(($tmp!="f")or($tmp!="m")){
			return true;
		}
		return false;
	}

	/**
	 * Returns true if given parameter is alphanumeric
	 * @param string $alpha
	 *   @access public
	 * @return bool
	 */
	function validateAlpha($alpha){
		//$match="/^[a-zA-Z]+$/";
		setlocale(LC_ALL, 'es_MX');
		$match="/^([\w+]+)$/";
		$result =  preg_match($match, $alpha);
		return $result;
	}
	
	/**
	 * Returns true if given parameter is a phone number
	 * @param stirng $phone
	 *  @access public
	 * @return bool
	 */
	function validatePhone($phone){
		$result =  preg_match("/^[0-9-]+$/",$phone);
		return $result;
	}
	
 

	/**
	 * Returns true if date is correct and falls between min and max dates.
	 * @param string $date date to validate in DD-MM-YYYY format
	 * @param array $params positional array containing min date and max date
	 * @return bool Returns True if given date format is correct and falls within the given range.
	 */
	 function validateDate($date,$params=array())
	 {
		$check=strtr($date,"/-.","---");

		list($d,$m,$y)=explode("-",$check);

		return checkdate($m,$d,$y);
	 }

	/*Displays error message and dies
	 *@param string $error  Error num to be printed
	 *@return void
	 */
	function authError($error=""){
		echo "<font color=red>";
		echo "Error ($error):<strong> Unauthorized File Access</strong><br><br>The following info has been logged:<br><br>";
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

	/*Displays a nicely formated message
	 *@param string $text  text to be printed
	 *@return void
	 */
	function flashText($text=""){
		?>
		<html>
		<head>
		<TITLE>Diccionario Husserl</TITLE>
		    <STYLE type="text/css">
		       BODY { 
				background-image: url("public/background.jpg");
				background-repeat: repeat;
				background-position: center;
		              }
		       </STYLE>
			       <link rel="stylesheet" href="libs/themes/default.css" type="text/css"></link>
			</head>
		    <body>
		    <?
               echo "<div align=\"middle\">\n";
               echo "<div class=\"flash\">\n";
               echo "$text</div></div></body></html>\n";
             die;
	}

}

