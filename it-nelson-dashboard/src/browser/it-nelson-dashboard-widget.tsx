import * as React from 'react';
import { injectable, postConstruct, inject } from '@theia/core/shared/inversify';
//import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';
import { Message } from '@theia/core/lib/browser';
import Dashboard from './Dashboard';

@injectable()
export class ItNelsonDashboardWidget extends ReactWidget {

    static readonly ID = 'it-nelson-dashboard:widget';
    static readonly LABEL = 'ItNelsonDashboard Widget';

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @postConstruct()
    protected init(): void {
        this.doInit()
    }

    protected async doInit(): Promise <void> {
        this.id = ItNelsonDashboardWidget.ID;
        this.title.label = ItNelsonDashboardWidget.LABEL;
        this.title.caption = ItNelsonDashboardWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-window-maximize'; // example widget icon.
        this.update();
    }

    render(): React.ReactElement {
     /*    const header = `questo servizio
        in order to display an info message to end users.`;  */
        return <div id='widget-container'>
            
           {/*  <AlertMessage type='INFO' header={header} />
            <button id='displayMessageButton' className='theia-button secondary' title='Display Message' onClick={_a => this.displayMessage()}>Display Message</button>
       */}
        
             <Dashboard/> 
        </div>
    }

    protected displayMessage(): void {
        this.messageService.info('Congratulazione: ItNelsonDashboard Widget Successfully Created!');
    }

    protected onActivateRequest(msg: Message): void {
        super.onActivateRequest(msg);
        const htmlElement = document.getElementById('displayMessageButton');
        if (htmlElement) {
            htmlElement.focus();
        }
    }

}
