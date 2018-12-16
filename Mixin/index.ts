class Dialog {
    public showDialog: boolean = false;
    closeDialog() {
        this.showDialog = false;
    }
    openDialog() {
        this.showDialog = true;
    }
}

class Table {
    public data: any[] = [];
    public editRow() {
        console.log('edit row');
    }
    public deleteRow() {
        console.log('delete row');
    }
}

class TableDialog implements Table, Dialog {
    constructor() {
        console.log('this table data is ' + this.data + 'and this dialog is' + `${this.showDialog ?  'visible' : 'hidden'}`)
    }

    public data: any[] = [];
    public showDialog: boolean = false;
    editRow(): () => void;    
    deleteRow: () => void;
    closeDialog: () => void;
    openDialog: () => void;
}

const applyMixinHelper = (targetClass: any, baseClasses: any[]) => {
    baseClasses.forEach(baseClass => {
        Object.getOwnPropertyNames(baseClass)
            .forEach(prop => {
                targetClass[prop] = baseClass[prop];
            });
    });
    return targetClass;
}

applyMixinHelper(TableDialog, [Table, Dialog]);

const tableDialog = new TableDialog();