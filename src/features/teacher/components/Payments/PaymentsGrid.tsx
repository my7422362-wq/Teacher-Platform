import { useTranslation } from 'react-i18next';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { PaymentsOverviewStats } from './PaymentsOverviewStats';
import { InstallmentsTable } from './InstallmentsTable';
import { PaymentsTable } from './PaymentsTable';
import { useTeacherInstallments, useTeacherPayments } from './queries';

export function PaymentsGrid() {
  const { t } = useTranslation();
  const { data: installments = [] } = useTeacherInstallments();
  const { data: payments = [] } = useTeacherPayments();

  return (
    <div className="space-y-6">
      <PaymentsOverviewStats installments={installments} payments={payments} />

      <Tabs defaultValue="installments">
        <TabsList>
          <TabsTrigger value="installments">{t('teacherPages.payments.tabInstallments')}</TabsTrigger>
          <TabsTrigger value="payments">{t('teacherPages.payments.tabPayments')}</TabsTrigger>
        </TabsList>

        <TabsContent value="installments">
          <InstallmentsTable />
        </TabsContent>
        <TabsContent value="payments">
          <PaymentsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
