var LARGEUR_CANVAS = 1500, HAUTEUR_CANVAS = 600;

var config = {
    type: Phaser.AUTO,
    width: LARGEUR_CANVAS,
    height: HAUTEUR_CANVAS,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
	scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var cursors, mario, terreman;
var plateformes;
var ennemies;


function preload () {
	this.load.image('mario', 'images/player2+.png');
	this.load.image('plateformeverte', 'images/plateforme.png');
	this.load.image('landscape', 'images/Forest_Landscapesv2.png');
	this.load.image('plateformespace', 'images/spaceplatform2.png');

	this.load.image('agressif', 'images/agressif2+.png');
	this.load.image('peureux', 'images/peureux2+.png');
	this.load.image('sauteur', 'images/sauteur2+.png');
	this.load.image('volant', 'images/volant2+.png');
	this.load.image('tireur', 'images/tireur2+.png');

	//this.load.spritesheet('peureuxanimleft', 'images/peureuxanimleft2.png', { frameWidth: 32*4, frameHeight: 32*4 });
}

function create () {
	//affichage du décor de fond
	this.add.image(800, 300, 'landscape');


	// création des plateformes
	plateformes = this.physics.add.staticGroup();

	plateformes.create(200, 580, 'plateformespace');//.setScale(3);		//\=-____\sol
	plateformes.create(700, 580, 'plateformespace');					///=-	 /sol
	plateformes.create(1200, 580, 'plateformespace');

	plateformes.create(0, 150, 'plateformespace');
	plateformes.create(1000, 400, 'plateformespace');			//setScale(1.5, 0.2);
	//plateformes.scaleX(2);
	//console.log(plateformes.children.entries[3]);


	// création des personnages
	mario = this.physics.add.sprite(250, 350, 'mario');//.setScale(0.5, 1);
	mario.scale = 0.5;
	mario.setCollideWorldBounds(true);
	this.physics.add.collider(plateformes, mario);

	ennemies = [];
	ennemies.push(this.physics.add.sprite(800, 80, 'agressif'));
	ennemies.push(this.physics.add.sprite(100, 80, 'peureux')/*.setScale(4)*/);
	ennemies.push(this.physics.add.sprite(200, 300, 'sauteur'));
	ennemies.push(this.physics.add.sprite(800, 80, 'volant'));
	ennemies.push(this.physics.add.sprite(800, 80, 'tireur'));

	// 	activer les collisions pour les ennemies
	ennemies.forEach((e) => {
		//e.scale = 0.1;
		e.setCollideWorldBounds(true);
		this.physics.add.collider(plateformes, e);
	});


	/*this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('peureuxanimleft', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });*/


	// créer le lecteur des evennements du clavier
	cursors = this.input.keyboard.createCursorKeys();


}


function update () {

	gererToucheClavier();

    gererComportementEnnemie(ennemies[0], Comportement.AGRESSIF);
    gererComportementEnnemie(ennemies[1], Comportement.PEUREUX, 0, 400);
    gererComportementEnnemie(ennemies[2], Comportement.SAUTEUR);
    gererComportementEnnemie(ennemies[3], Comportement.VOLANT);
    gererComportementEnnemie(ennemies[4], Comportement.TIREUR, 600, 1400);

}

function gererToucheClavier(){
	mario.setVelocityX(0);
	if (cursors.left.isDown) {
        mario.setVelocityX(-250);
    } 
    if (cursors.right.isDown) {
        mario.setVelocityX(250);
    } 
    if (cursors.space.isDown && mario.body.touching.down) {
    	mario.setVelocityY(-400);
    }
}



function gererComportementEnnemie(ennemi, idc, debut_pltfm, fin_pltfm){
	switch(idc){
		case Comportement.AGRESSIF :
			ennemi.body.allowGravity = true;
			agirAgressif(ennemi);
			break;

		case Comportement.PEUREUX :
			ennemi.body.allowGravity = true;
			agirPeureux(ennemi, debut_pltfm, fin_pltfm);
			break;

		case Comportement.SAUTEUR :
			ennemi.body.allowGravity = true;
			agirSautant(ennemi);
			break;

		case Comportement.VOLANT :
			ennemi.body.allowGravity = false;
			agirVolant(ennemi);
			break;

		case Comportement.TIREUR :
			ennemi.body.allowGravity = true;
			agirTireur(ennemi, debut_pltfm, fin_pltfm); //600 1400
			break;

		default :
			ennemi.setVelocityX(0);
			break;
	}
}
