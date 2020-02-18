<?
/**
 * This file calls the libraries for the whole frame work. Its called by the index.php in the root folder
 * generator.
 * @filesource
 * @package snfm
 * @subpackage snfm.libs
 * @Author Cake development Team
 */
 
require "html.php";
require "acl.php";
require "dhtml.php";
require "snfmModel.php";
require "snfm.php";
require "menuSite.php";
require "adodb/adodb.inc.php";


if(isset($EDITOR)) require "fckeditor.php";

?>
