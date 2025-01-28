'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useMessages } from '@/lib/store/messages';
import { supabaseBrowser } from '@/lib/supabase/client';
import { toast } from 'sonner';

export function DeleteAlert() {
  const actionMessage = useMessages((state) => state.actionMessage);
  const optimisticDeleteMessage = useMessages(
    (state) => state.optimisticDeleteMessage
  );

  async function handleDelete() {
    const supabase = supabaseBrowser();

    if (actionMessage) {
      optimisticDeleteMessage(actionMessage?.id);
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', actionMessage.id);

      if (error) {
        toast.error('Erro ao deletar a mensagem');
      } else {
        toast.success('Mensagem deletada com sucesso');
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger id="trigger-delete"></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja continuar?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação é irreversível. Sua mensagem será excluída
            permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
