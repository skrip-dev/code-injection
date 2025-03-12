async function loadAndExecuteScript() {
  const scriptId = 'chatwoot_skrip_dev';
  const scriptUrl = 'https://raw.githubusercontent.com/skrip-dev/code-injection/refs/heads/main/src/chatwoot_for_inject.js';

  if (document.querySelector(`script[id="${scriptId}"]`)) {
    console.log('Script já foi carregado.');
    return;
  }

  try {
    const response = await fetch(scriptUrl);

    if (!response.ok) {
      throw new Error('Erro ao baixar o script: ' + response.statusText);
    }

    const scriptContent = await response.text();

    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.text = scriptContent;
    scriptElement.id = scriptId;

    document.body.appendChild(scriptElement);

    console.log('Script carregado e executado com sucesso.');
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

loadAndExecuteScript();
