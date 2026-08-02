import { useTranslation } from 'react-i18next';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { PaymentsOverviewStats } from './PaymentsOverviewStats';
import { InstallmentsTable } from './InstallmentsTable';
import { PaymentsTable } from './PaymentsTable';
import { getPaymentsOverview } from './data';

export function PaymentsGrid() {
  const { t } = useTranslation();
  const overview = getPaymentsOverview();

  return (
    <div className="space-y-6">
      <PaymentsOverviewStats overview={overview} />

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
