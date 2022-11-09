export default function Footer() {
  return (
    <footer className="my-16 mr-8 text-center text-[#b3b3b3] ">
      <section className="flex flex-col items-center">
        <div>
          <a
            href="https://luyiin.me"
            target="_blank"
            className="pl-1"
            rel="noreferrer"
          >
            「 Luyiin
          </a>
          <a
            href="https://github.com/ZiYi0414/handsome-css3-lib"
            target="_blank"
            className="pl-1"
            rel="noreferrer"
          >
            © HANDSOME-CSS-LIB 」 🌸  {new Date().getFullYear()} 
          </a>
        </div>
      </section>
    </footer>
  );
}
