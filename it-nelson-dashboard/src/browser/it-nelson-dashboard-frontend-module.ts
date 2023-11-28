import { ContainerModule } from '@theia/core/shared/inversify';
import { ItNelsonDashboardWidget } from './it-nelson-dashboard-widget';
import { ItNelsonDashboardContribution } from './it-nelson-dashboard-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, ItNelsonDashboardContribution);
    bind(FrontendApplicationContribution).toService(ItNelsonDashboardContribution);
    bind(ItNelsonDashboardWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: ItNelsonDashboardWidget.ID,
        createWidget: () => ctx.container.get<ItNelsonDashboardWidget>(ItNelsonDashboardWidget)
    })).inSingletonScope();
});
