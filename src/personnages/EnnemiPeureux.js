class EnnemiPeureux extends Personnage {

	
	constructor(x, y, vitesse, rayon, debut_pltfm, fin_pltfm, physics, plateformes, sprite){
		super(x, y, vitesse, sprite, physics, plateformes);

		this.rayon = rayon;
		this.debut_pltfm = debut_pltfm;
		this.fin_pltfm = fin_pltfm;

		this.nb_pixel_avant_fuite = 200;
		this.fuit = 0;
		this.temps_fuite = 50;
		this.frame_fuite = 0;

		
	}

	agir(mario) {
		this.corp.body.allowGravity = true;
		// si l'this.corp est dans un rayon de rayon pixel autour du personnage
		if (Math.sqrt(Math.pow(mario.x - this.corp.x, 2) + Math.pow(mario.y - this.corp.y, 2)) < this.rayon) {
			if (this.fuit != 0) {
				this.avancerSurLaPlateforme(this.corp, this.debut_pltfm, this.fin_pltfm, this.vitesse*this.fuit);
				if (this.frame_fuite == 0) { this.fuit = 0; }
				this.frame_fuite--;
			} else {
				if (mario.x - this.corp.x < 0) {	//si l'this.corp est après mario
					//si l'this.corp est bloqué dans le coin droit de la map ou de la plateforme
					if ((this.fin_pltfm - this.corp.x < this.nb_pixel_avant_fuite 
						&& this.fin_pltfm - mario.x < this.nb_pixel_avant_fuite)		
						/*si this.corp coincé entre mario et le bord droit d'une plateforme*/
						||	/* OU */
						(LARGEUR_CANVAS - this.corp.x < this.nb_pixel_avant_fuite	
						&& LARGEUR_CANVAS - mario.x < this.nb_pixel_avant_fuite)
						/*si this.corp coincé entre mario et le bord droit de la map*/
						) {

						this.avancerSurLaPlateforme(this.corp, this.debut_pltfm, this.fin_pltfm, -this.vitesse);
						this.fuit = -1;
						this.frame_fuite = this.temps_fuite;		//fuit temps_fuite frames vers la gauche
					} else {
						//console.log("je n'echappe pas");
						this.avancerSurLaPlateforme(this.corp, this.debut_pltfm, this.fin_pltfm, this.vitesse);
					}

				} else {		//si mario est après l'this.corp 
					//si l'this.corp est bloqué dans le coin gauche de la map ou de la plateforme
					if ((this.corp.x - this.debut_pltfm < this.nb_pixel_avant_fuite 
							&& mario.x - this.debut_pltfm < this.nb_pixel_avant_fuite)
						/*si this.corp coincé entre mario et le bord gauche d'une plateforme*/
						|| /* OU */
						(this.corp.x < this.nb_pixel_avant_fuite 
							&& mario.x < this.nb_pixel_avant_fuite) 
						/*si this.corp coincé entre mario et le bord gauche de la map*/
						) {

						this.avancerSurLaPlateforme(this.corp, this.debut_pltfm, this.fin_pltfm, this.vitesse);
						this.fuit = 1;
						this.frame_fuite = this.temps_fuite;			//fuit temps_fuite frames vers la droite
					} else {
						//console.log("je n'echappe pas");
						this.avancerSurLaPlateforme(this.corp, this.debut_pltfm, this.fin_pltfm, -this.vitesse);
						//this.corp.anims.play('left', true);
					}
				} 
			}

		} else {
			this.corp.setVelocityX(0);
		}
	}


	avancerSurLaPlateforme(corp, debut, fin, velocite){
	if (corp.x >= fin && velocite > 0) {
		corp.x = fin;
		corp.setVelocityX(0);
	} else if (corp.x <= debut && velocite < 0) {
		corp.x = debut;
		corp.setVelocityX(0);
	} else {
		corp.setVelocityX(velocite);
	}
}

}