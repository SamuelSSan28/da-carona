const subscriptionWebPush = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_MSG_PUBLIC_KEY,
    });

    const endpoint = subscription.endpoint;

    console.log("Subscription endpoint:", endpoint);
    return endpoint;
  } catch (error) {
    console.error("Erro ao solicitar permissão de notificação:", error);
  }
};

export { subscriptionWebPush };
