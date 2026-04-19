function Footer({ total, completed, pending }: { total: number, completed: number, pending: number }){
    return(
        <div className="footer">
            <span>Total: {total}</span>
            <span>Completadas: {completed}</span>
            <span>Pendientes: {pending}</span>
        </div>
    );
}

export default Footer;