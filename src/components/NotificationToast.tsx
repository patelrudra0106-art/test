import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface NotificationToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  onDismiss,
}) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-md w-[calc(100vw-2.5rem)] sm:w-auto"
        >
          <div className="glass-notification rounded-glass px-4 py-3.5 flex items-start gap-3 border border-warm-border shadow-glass-hover">
            <div className="w-8 h-8 rounded-full bg-forest-green/15 text-forest-green flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-forest-green" />
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <p className="text-[12px] font-bold uppercase tracking-wider text-forest-green">
                Vidya Pragati Setu · Notice
              </p>
              <p className="text-[13.5px] font-medium text-charcoal leading-snug mt-0.5">
                {message}
              </p>
            </div>

            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss notification"
              className="p-1.5 rounded-full text-muted-text hover:text-charcoal hover:bg-warm-ivory/60 transition-colors shrink-0"
            >
              <X aria-hidden="true" className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;
