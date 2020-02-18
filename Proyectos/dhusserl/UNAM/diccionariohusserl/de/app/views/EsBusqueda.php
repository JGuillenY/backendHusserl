<?
if ($_GET['exec']){
	if ($_GET['ref']) $this->showRefs($_GET['exec'],$_GET['nameid'],$this->previous);         
	elseif ($_GET['def']) $this->showFrameQuery($_GET['exec']);
	elseif ($_GET['edit']){
		if(isset($_GET['refid'])){
			if($this->acl->aclHasPermission()) $this->showEditRefContent();
		}
		else {
			if($this->acl->aclHasPermission()) $this->showEditWindow();          
		} 
	}
}



else{
	echo $this->html->formTag("search");
	$style1=array("style"=>"font-size:15px; font-weight: lighter; font-family: arial,sans-serif,helvetica;",
			"value"=>$this->data['palabra'][0]);
	$style2=array("style"=>"font-size:15px; font-weight:bold; font-family: arial,sans-serif,helvetica;");
	$code= "<table border=0 width=99%><tr><td width=100%>
		<div class=\"normaltitle\">".$this->text['search'].$this->html->inputTag("palabra",17,$style1)."
		".$this->html->submitTag($this->text['tosearch'],$style2)."</div></td></tr></table>";
	$this->drawTitle($code);
	echo $this->html->closeFormTag();
	if(!($this->search))$this->searchForm();
	if ($this->search){
		echo "<table border=0 width=100%><tr><td valign=top>";
		$this->showQuery();
		echo "</td><td border=\"0\" align=\"middle\" rowspan=\"2\" valign=middle class=datatbl>";
		$url=$this->html->here."&ESCAPE=1&exec=default";
			echo "<iframe name=\"datamain\" src=\"$url\" width=570 height=498 
		marginwidth=\"0\" marginheight=\"0\" hspace=\"0\" vspace=\"0\" frameborder=\"0\" scrolling=\"auto\"></iframe>";

		echo "</td></tr></table>";
	}
}

?>
