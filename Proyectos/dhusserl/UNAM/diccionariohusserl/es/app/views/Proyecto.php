<?
if($_GET['edit'] and $this->acl->aclHasPermission())$this->editContent();
else $this->displayContent();
?>
