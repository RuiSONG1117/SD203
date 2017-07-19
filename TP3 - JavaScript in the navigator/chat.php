<?php 

// création de la chaine à ajouter dans le fichier
	$chaine = "<br />- ";
	$chaine .= "<a href='javascript:recherche(\"" . $_GET['client_ip'] . "\");'>" . $_GET['client_ip'] . "</a>";
	$chaine .=  " - " . $_GET['phrase'];


	$fp = fopen("texte.html","a");

	fwrite($fp, $chaine);
	fclose($fp);
	echo "Ecriture reussie";

?>
