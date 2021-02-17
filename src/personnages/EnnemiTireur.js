class EnnemiTireur extends EnnemiPeureux {


	constructor(x, y, vitesse, rayon, debut_pltfm, fin_pltfm, physics, plateformes){
		super(x, y, vitesse, rayon, debut_pltfm, fin_pltfm, physics, plateformes, 'tireur');

		this.temps_tir = 450;
		this.frame_tir = 0;
		this.frame_tireur_fuite = 0;
	}


	agir() {
		if (this.frame_tireur_fuite == 0) {
			this.frame_tireur_fuite = Math.floor((Math.random() * 800) + 400);
			this.frame_tir = this.temps_tir;
		} else {
			this.frame_tireur_fuite--;
		}

		if (this.frame_tir == 0) {
			super.agir(mario.corp);
		} else {
			this.corp.setVelocityX(0);
			this.frame_tir--;
		}
	}

}