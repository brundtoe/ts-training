class MyClass {
    public render(divId: string, text: string){
        const el: HTMLElement | null = document.getElementById(divId)
        if (el) {
            el.innerText = text
        }
    }
}
document.addEventListener('DOMContentLoaded', function (e: Event ) {

    e.preventDefault()
    const myClass = new MyClass()
    myClass.render('content',"Hello Jackie")

} )
