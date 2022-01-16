// import className from '../assets/styles/footer.styl'
import '../assets/styles/footer.styl'
export default {
    data(){
        return {
            author:'jokcy'
        }
    },
    render(){
        return(
            // id={className.footer}
            <div id="footer">
                <span>written by jokcy{this.author}</span>
            </div>
        )
    }
}