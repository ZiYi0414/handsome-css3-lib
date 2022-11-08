export default function Footer() {
  return (
    <footer className="my-16 mr-8 text-right text-[#b3b3b3] ">
      <section className="flex flex-col items-end">
        <div>
          <a
            href="https://github.com/ZiYi0414"
            target="_blank"
            className="pl-1"
            rel="noreferrer"
          >
            © HANDSOME-CSS-LIB 🌸
            {' '}
            {new Date().getFullYear()}
          </a>
        </div>
      </section>
    </footer>
  );
}
