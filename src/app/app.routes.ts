import { Routes } from '@angular/router';
import { ChatWindow } from './chat-window/chat-window';
import { StarterPage } from './starter-page/starter-page';
import { ChatLanding } from './chat-landing/chat-landing';
import { KnowledgeBaseLanding } from './knowledge-base-landing/knowledge-base-landing';
import { KnowledgeBase } from './knowledge-base/knowledge-base';
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
    },
    {
        path: 'knowledge-base-landing',
        component: KnowledgeBaseLanding
    },
    {
        path: 'knowledge-base',
        component: KnowledgeBase
    }
];
