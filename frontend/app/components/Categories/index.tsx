import Category from "./Category";

interface CategoriesProps {
    data: {
        label: string;
        count: number;
    }[];
}

export default function Categories({ data }: CategoriesProps) {
    return (
        <section className="categories">
            <h2 className="categories__label">Categories</h2>
            <div className="categories__cards">
                {data.map((item, index) => (
                    <Category key={index} count={item.count} label={item.label}/>
                ))}
            </div>
        </section>
    );
}
