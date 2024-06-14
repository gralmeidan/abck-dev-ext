import '../../app.css';
import Panel from '../../components/Panel.svelte';
import { getInspectedDomain } from '../../helpers/navigation';

const target = document.getElementById('app');

async function render() {
  const domain = await getInspectedDomain();

  new Panel({ target, props: { domain } });
}

document.addEventListener('DOMContentLoaded', render);
