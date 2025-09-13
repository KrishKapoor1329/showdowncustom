import {PRNG, PRNGSeed} from '../../../sim/prng';
import RandomGen6Teams from '../gen6/teams';

export default class RandomGen6MultiMegaTeams extends RandomGen6Teams {
	constructor(format: Format | string, prng: PRNG | PRNGSeed | null) {
		super(format, prng);
	}

	randomTeam() {
		// Generate a base random team
		const team = super.randomTeam();
		
		// Available Mega Pokemon in Gen 6 (already in mega form)
		const megaForms = [
			'venusaurmega', 'charizardmegax', 'charizardmegay', 'blastoisemega', 'alakazammega', 
			'gengarmega', 'kangaskhanmega', 'pinsirmega', 'gyaradosmega', 'aerodactylmega', 
			'mewtwomegax', 'mewtwomegay', 'ampharosmega', 'scizormega', 'heracrossmega', 
			'houndoommega', 'tyranitarmega', 'blazikenmega', 'gardevoirmega', 'mawilmega', 
			'aggronmega', 'medichammega', 'manectricmega', 'banettemega', 'absolmega', 
			'garchompmega', 'lucariomega', 'abomasowmega', 'beedrillmega', 'pidgeotmega', 
			'slowbromega', 'steelixmega', 'sceptilemega', 'swampertmega', 'sableyemega', 
			'sharpedomega', 'cameruptmega', 'altariamega', 'galiemega', 'salamencemega', 
			'metagrossmega', 'latiasmega', 'latiosmega', 'rayquazamega', 'lopunnymega', 
			'gallademega', 'audinomega', 'dianciemega', 'kyogreprimal', 'groudonprimal'
		];
		
		// Replace first Pokemon with a guaranteed mega (already in mega form)
		if (team.length > 0) {
			const chosenMega = this.sample(megaForms);
			const megaSpecies = this.dex.species.get(chosenMega);
			
			if (megaSpecies.exists) {
				// Generate a proper set for the mega Pokemon
				const megaSet = this.randomSet(megaSpecies, {}, false, false, false);
				
				// Override to ensure it's already in mega form (no mega stone needed)
				megaSet.species = megaSpecies.name;
				megaSet.item = ''; // No mega stone needed since it's already mega
				
				// Replace the first Pokemon with our guaranteed mega
				team[0] = megaSet;
			}
		}
		
		return team;
	}
}
