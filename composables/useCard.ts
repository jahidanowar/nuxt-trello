export const useCard = () => {
  async function destroy(
    listId: string,
    cardId: string,
    onDestroy?: () => void
  ) {
    try {
      useToast().add({
        title: "Delete card",
        description: "Are you sure you want to delete this card?",
        actions: [
          {
            label: "Canel",
            click: () => {},
          },
          {
            label: "Yes",
            color: "red",
            click: async () => {
              await useFetch(`/api/lists/${listId}/cards/${cardId}`, {
                method: "DELETE",
              });
              onDestroy?.();
            },
          },
        ],
        timeout: 5000,
        color: "red",
      });
    } catch (e: any) {
      useToast().add({
        title: "Error",
        description: e.message || "Something went wrong",
      });
    }
  }

  async function update(
    listId: string,
    cardId: string,
    data: Record<string, unknown>
  ) {
    await useFetch(`/api/lists/${listId}/cards/${cardId}`, {
      body: data,
      method: "PUT",
      watch: false,
    });
  }

  return {
    destroy,
    update,
  };
};
