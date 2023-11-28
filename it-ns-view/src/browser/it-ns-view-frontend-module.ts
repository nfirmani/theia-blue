import { ContainerModule } from '@theia/core/shared/inversify';
import { ItNsViewWidget } from './it-ns-view-widget';
import { ItNsViewContribution } from './it-ns-view-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, ItNsViewContribution);
    bind(FrontendApplicationContribution).toService(ItNsViewContribution);
    bind(ItNsViewWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: ItNsViewWidget.ID,
        createWidget: () => ctx.container.get<ItNsViewWidget>(ItNsViewWidget)
    })).inSingletonScope();
});
