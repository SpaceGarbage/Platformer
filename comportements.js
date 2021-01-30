


const Comportement = {
	AGRESSIF: 1, 
	PEUREUX: 2,
	SAUTEUR: 3,
	VOLANT: 4,
	TIREUR: 5,
};

//var agressif
var vitesse_agressif = 150;
var rayon_agressif = 400;

//var peureux
var vitesse_peureux = 400;
var rayon_peureux = 700;
var nb_pixel_avant_fuite = 200;
var fuit = 0;
var temps_fuite = 50;	//frame de fuite

//var sauteur
var hauteur_sauts = [250, 400, 320];
var idsaut = 0;

//var volant
var altitude = 60;
var direction = 1;
var vitesse_volant = 250;
var vitesse_dash = 600;
var temps_dash = 70; temps_non_dash = 0;
var pixelDemiTour = 100;
var frame_dash;

//var tireur
var temps_tir = 450, frame_tir = 0;
var frame_tireur_fuite = 0;




function agirAgressif(ennemi){
	//console.log("je suis agressif grrr grrr sale pédale");
	// si l'ennemi est dans un rayon de rayon_agressif pixel autour du personnage
	if (Math.sqrt(Math.pow(mario.x - ennemi.x, 2) + Math.pow(mario.y - ennemi.y, 2)) < rayon_agressif) {
		if (mario.x - ennemi.x < -40) {	// si mario est à gauche de ennemi
			ennemi.setVelocityX(-vitesse_agressif);	//	ennemi va vers la gauche
		} else if (mario.x - ennemi.x > 40) {		// si mario est à droite de ennemi
			ennemi.setVelocityX(vitesse_agressif);	//	ennemi va vers la droite
		} else {
			ennemi.setVelocityX(0);	// sinon ennemi reste immobile
		}
	} else {
		ennemi.setVelocityX(0);	// sinon ennemi reste immobile
	}
}
	

function agirPeureux(ennemi, debut_pltfm, fin_pltfm){

	//var debut_pltfm = plateforme==null? 0 : plateforme.body.position.x;
	//var fin_pltfm = plateforme==null? LARGEUR_CANVAS : plateforme.body.position.x + plateforme.width;

	//console.log("debut: " + debut_pltfm + " fin: " + fin_pltfm);

	// si l'ennemi est dans un rayon de rayon_peureux pixel autour du personnage
	if (Math.sqrt(Math.pow(mario.x - ennemi.x, 2) + Math.pow(mario.y - ennemi.y, 2)) < rayon_peureux) {
		if (fuit != 0) {
			avancerSurLaPlateforme(ennemi, debut_pltfm, fin_pltfm, vitesse_peureux*fuit);
			if (frame_fuite == 0) { fuit = 0; }
			frame_fuite--;
		} else {
			if (mario.x - ennemi.x < 0) {	//si l'ennemi est après mario
				//si l'ennemi est bloqué dans le coin droit de la map ou de la plateforme
				if ((fin_pltfm - ennemi.x < nb_pixel_avant_fuite 
					&& fin_pltfm - mario.x < nb_pixel_avant_fuite)		
					/*si ennemi coincé entre mario et le bord droit d'une plateforme*/
					||	/* OU */
					(LARGEUR_CANVAS - ennemi.x < nb_pixel_avant_fuite	
					&& LARGEUR_CANVAS - mario.x < nb_pixel_avant_fuite)
					/*si ennemi coincé entre mario et le bord droit de la map*/
					) {

					avancerSurLaPlateforme(ennemi, debut_pltfm, fin_pltfm, -vitesse_peureux);
					fuit = -1;
					frame_fuite = temps_fuite;		//fuit temps_fuite frames vers la gauche
				} else {
					//console.log("je n'echappe pas");
					avancerSurLaPlateforme(ennemi, debut_pltfm, fin_pltfm, vitesse_peureux);
				}

			} else {		//si mario est après l'ennemi 
				//si l'ennemi est bloqué dans le coin gauche de la map ou de la plateforme
				if ((ennemi.x - debut_pltfm < nb_pixel_avant_fuite 
						&& mario.x - debut_pltfm < nb_pixel_avant_fuite)
					/*si ennemi coincé entre mario et le bord gauche d'une plateforme*/
					|| /* OU */
					(ennemi.x < nb_pixel_avant_fuite 
						&& mario.x < nb_pixel_avant_fuite) 
					/*si ennemi coincé entre mario et le bord gauche de la map*/
					) {

					avancerSurLaPlateforme(ennemi, debut_pltfm, fin_pltfm, vitesse_peureux);
					fuit = 1;
					frame_fuite = temps_fuite;			//fuit temps_fuite frames vers la droite
				} else {
					//console.log("je n'echappe pas");
					avancerSurLaPlateforme(ennemi, debut_pltfm, fin_pltfm, -vitesse_peureux);
					//ennemi.anims.play('left', true);
				}
			} 
		}

	} else {
		ennemi.setVelocityX(0);
	}
	//console.log(fuit);
}


function agirSautant(ennemi){
	if (ennemi.body.touching.down) {
		ennemi.setVelocityY(-hauteur_sauts[idsaut]);
		//console.log(-hauteur_sauts[idsaut] + " : " + idsaut);
		idsaut = (idsaut+1)%hauteur_sauts.length;
	}
}


function agirVolant(ennemi){
	if (temps_non_dash == 0) {
		temps_non_dash = Math.floor((Math.random() * 500) + 300);
		frame_dash = temps_dash;
	} else {
		temps_non_dash--;
	}

	if (ennemi.y > altitude) {
		ennemi.setVelocityY(-100);
	} else {
		ennemi.setVelocityY(0);
	}

	if (ennemi.x < pixelDemiTour) {
		direction = 1;
	} else if (LARGEUR_CANVAS - ennemi.x < pixelDemiTour) {
		direction = -1;
	}

	if (frame_dash == 0) {
		ennemi.setVelocityX(vitesse_volant * direction);
	} else {
		ennemi.setVelocityX(vitesse_dash * direction);
		frame_dash--;
	}
}


function agirTireur(ennemi, debut_pltfm, fin_pltfm){
	if (frame_tireur_fuite == 0) {
		frame_tireur_fuite = Math.floor((Math.random() * 800) + 400);
		frame_tir = temps_tir;
	} else {
		frame_tireur_fuite--;
	}

	if (frame_tir == 0) {
		agirPeureux(ennemi, debut_pltfm, fin_pltfm);
	} else {
		ennemi.setVelocityX(0);
		frame_tir--;
	}
}


function avancerSurLaPlateforme(ennemi, debut, fin, velocite){
	if (ennemi.x >= fin && velocite > 0) {
		ennemi.x = fin;
		ennemi.setVelocityX(0);
	} else if (ennemi.x <= debut && velocite < 0) {
		ennemi.x = debut;
		ennemi.setVelocityX(0);
	} else {
		ennemi.setVelocityX(velocite);
	}
}