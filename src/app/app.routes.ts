import { Routes } from '@angular/router';
import { ChatWindow } from './chat-window/chat-window';
import { StarterPage } from './starter-page/starter-page';
import { ChatLanding } from './chat-landing/chat-landing';
export const routes: Routes = [
    {
        path: '',
        component: StarterPage
    },
    {
        path: 'chat-window',
        component: ChatWindow
    },
    {
        path: 'chat-landing',
        component: ChatLanding
    }
];
