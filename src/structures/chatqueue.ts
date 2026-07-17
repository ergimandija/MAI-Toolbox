export class ChatQueue<T> {
    private items: T[] = [];
    public enqueue(item: T): void {
        if(this.items.length == 15){
            this.dequeue();
        }
        this.items.unshift(item);
        
    }    

    public dequeue(): void {
        this.items.pop();
    }

    public getItems(): T[] {
        return this.items.reverse();
    }   
}    

