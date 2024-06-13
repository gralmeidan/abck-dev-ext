import '../../app.css';
import Panel from '../../components/Panel.svelte';

const target = document.getElementById('app');

function render() {
  new Panel({ target });
}

document.addEventListener('DOMContentLoaded', render);
