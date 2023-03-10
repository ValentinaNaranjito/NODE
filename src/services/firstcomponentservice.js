export class firstcomponentservice{ 
    static state = [];
    static initializestate ( state )
    {
        this.state = state; 
    } 
    static additem (id, value, checked)
    {
        this.state.push ({
            id: id,
            value: value,
            checked: checked,
        })
        console.log (this.state)
    }
    static updateitem (id,value){
    let item = this.state.find((t)=>t.id===id);
    item.value=value;    
    }
    static checkeditem (id, checked){
        let item = this.state.find ((t)=>t.id===id);
        item.checked =checked;
    }
    static deleteitem (id){
        this.state=this.state.filter ((t)=>t.id!==id)
    }
}