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
	echo "<table border=\"0\" width=\"99%\"><tr><td width=\"100%\">";
	$this->drawTabs();
	echo "</td></tr></table>";
	echo "<table border=\"0\" width=\"99%\"><tr><td width=\"35%\" valign=\"top\">";
	if($this->tab==0) $this->tabs0Form();
	$this->showQuery();
	echo "</td><td border=\"0\" align=\"middle\" valign=\"middle\" class=\"datatbl\">";
	$url=$this->html->here."&ESCAPE=1&exec=default";
	echo "<iframe name=\"datamain\" src=\"$url\" width=570 height=498
		marginwidth=\"0\" marginheight=\"0\" hspace=\"0\" vspace=\"0\" frameborder=\"0\" scrolling=\"auto\"></iframe>";
	echo "</td></tr></table>";
}


?>
