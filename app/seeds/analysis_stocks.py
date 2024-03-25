from app.models import db, Analysis, environment, SCHEMA
from sqlalchemy.sql import text



def seed_analysis_stocks():
    analyses = [
        {
            "user_id": 2,
            "stock_id": 1,
            "content": "Apple Inc. has been a dominant force in the technology sector for years, consistently innovating and delivering groundbreaking products. With the recent release of the iPhone 14, anticipation is high for another wave of strong sales. Additionally, Apple's expansion into services such as Apple Music and Apple TV+ provides a diverse revenue stream. However, concerns over supply chain disruptions and increasing competition from Android devices could impact future growth. Despite these challenges, Apple's strong brand loyalty and financial stability make it a compelling investment option. Therefore, I recommend buying Apple stock.",
            "recommendation": "Buy"
        },
        {
            "user_id": 3,
            "stock_id": 1,
            "content": "Apple Inc. continues to impress investors with its consistent growth and strong financial performance. The company's recent earnings report exceeded expectations, driven by robust sales of the latest iPhone models and steady growth in the services segment. Moreover, Apple's aggressive share buyback program signals confidence in its future prospects. However, concerns about potential regulatory scrutiny and slowing iPhone demand in key markets linger. Despite these risks, Apple's strong ecosystem and loyal customer base position it well for long-term success. Therefore, I recommend selling onto Apple stock for now.",
            "recommendation": "Sell"
        },
        {
            "user_id": 4,
            "stock_id": 1,
            "content": "Apple Inc. faces both opportunities and challenges in the current market landscape. On one hand, the company's expansion into wearables and services has diversified its revenue sources and reduced dependence on iPhone sales. Additionally, Apple's strong balance sheet and cash reserves provide ample room for investments and acquisitions. However, concerns about a potential slowdown in global smartphone sales and increasing competition from Chinese manufacturers pose risks to Apple's growth trajectory. Despite these headwinds, Apple's loyal customer base and brand strength remain unparalleled. Thus, I recommend selling Apple stock for now.",
            "recommendation": "Sell"
        },
        {
            "user_id": 5,
            "stock_id": 1,
            "content": "Apple Inc. stands at a crossroads as it navigates a rapidly changing tech landscape. The company's recent product launches, including the iPhone 14 and new MacBook models, have garnered positive reviews and strong consumer interest. Moreover, Apple's focus on sustainability and privacy resonates well with today's socially conscious consumers. However, concerns about supply chain disruptions and potential component shortages could impact future production and revenue. Despite these challenges, Apple's robust ecosystem and loyal customer base provide a solid foundation for continued growth. Therefore, I recommend buying Apple stock.",
            "recommendation": "Buy"
        },
        {
            "user_id": 6,
            "stock_id": 1,
            "content": """Apple Inc. stands at the forefront of the technology industry, with a reputation for innovation, quality, and customer satisfaction. The company's diverse product lineup, which includes the iPhone, iPad, Mac, and Apple Watch, caters to a broad range of consumer needs and preferences. Moreover, Apple's ecosystem of services, such as Apple Music, iCloud, and Apple Arcade, enhances the overall user experience and generates additional revenue streams.

            The recent launch of the iPhone 14 has generated considerable excitement among consumers and investors alike. With advanced features such as 5G connectivity, improved camera capabilities, and enhanced performance, the iPhone 14 is expected to drive strong sales and further solidify Apple's market position. Additionally, Apple's expansion into new product categories, such as wearables and services, provides opportunities for growth and diversification.

            Despite its many strengths, Apple faces several challenges in today's complex and competitive market. Supply chain disruptions, semiconductor shortages, and geopolitical tensions can all impact the company's ability to meet demand and fulfill orders in a timely manner. Moreover, regulatory scrutiny and antitrust concerns pose potential risks to Apple's business practices and market dominance.

            However, Apple's strong brand loyalty and customer engagement give it a significant competitive advantage. The company's focus on innovation, design, and user experience resonates with consumers worldwide, driving demand for its products and services. Moreover, Apple's robust financial position and disciplined capital allocation provide a solid foundation for long-term growth and value creation.

            In summary, Apple Inc. remains a compelling investment opportunity for investors seeking exposure to the technology sector.""",
            "recommendation": "Hold"
        },
        {
            "user_id": 7,
            "stock_id": 1,
            "content": """Apple Inc. stands as a titan in the technology industry, with a legacy of innovation and a global footprint. The company's relentless pursuit of excellence has led to iconic products that have reshaped entire markets and redefined user experiences. From the Macintosh computer to the iPhone and beyond, Apple's product lineup represents the pinnacle of design, engineering, and usability.

            The recent release of the iPhone 14 underscores Apple's commitment to pushing the boundaries of technology and design. With advanced features such as improved camera capabilities, faster processors, and enhanced battery life, the iPhone 14 is poised to be another bestseller for the company. Moreover, Apple's ecosystem of services, including Apple Music, iCloud, and Apple TV+, provides a steady stream of recurring revenue that complements its hardware sales.

            Despite its many strengths, Apple faces several challenges in today's fast-paced and competitive market. Supply chain disruptions, semiconductor shortages, and geopolitical tensions can all impact the company's ability to manufacture and deliver its products in a timely manner. Additionally, regulatory scrutiny and antitrust concerns pose potential risks to Apple's business practices and market dominance.

            However, Apple's strong brand loyalty and customer satisfaction give it a significant competitive advantage. The company's focus on user privacy, data security, and environmental sustainability resonates with consumers worldwide, enhancing its brand image and customer goodwill. Moreover, Apple's robust financial position and disciplined capital allocation provide a solid foundation for long-term growth and value creation.

            In conclusion, Apple Inc. remains a compelling investment opportunity for investors seeking exposure to the technology sector. While challenges persist, the company's track record of innovation, resilience, and customer-centric approach make it a standout choice for long-term investors.""",
            "recommendation": "Hold"
        },
        {
            "user_id": 8,
            "stock_id": 1,
            "content":"""Apple Inc. has been a dominant player in the technology industry for decades, consistently setting trends and reshaping consumer expectations. The company's iconic products, from the Macintosh computer to the iPhone, have not only revolutionized their respective markets but have also become cultural touchstones. Apple's ability to seamlessly integrate hardware, software, and services has created a unique ecosystem that keeps customers loyal and engaged.

            With the recent release of the iPhone 14, anticipation is high for another wave of strong sales. Apple's marketing prowess and brand appeal ensure that each new iPhone launch is met with enthusiasm from consumers around the world. The iPhone remains the cornerstone of Apple's business, driving a significant portion of its revenue and profit. However, the company's product lineup extends far beyond smartphones.

            In recent years, Apple has made significant investments in wearables, services, and other emerging technologies. The Apple Watch, AirPods, and other accessories have become increasingly popular among consumers, further solidifying Apple's position in the market. Additionally, services such as Apple Music, iCloud, and Apple TV+ provide a recurring revenue stream that complements hardware sales.

            Despite Apple's continued success, the company faces several challenges in the competitive tech landscape. Supply chain disruptions, semiconductor shortages, and geopolitical tensions can all impact Apple's ability to manufacture and distribute its products. Moreover, regulatory scrutiny and antitrust concerns pose potential risks to Apple's business model and market dominance.

            Nevertheless, Apple's strong brand loyalty, innovative spirit, and financial stability make it a compelling investment option. The company's vast cash reserves provide a buffer against economic downturns and unforeseen challenges. Furthermore, Apple's commitment to privacy, sustainability, and social responsibility resonates with today's consumers, enhancing its brand image and customer goodwill.

            In conclusion, Apple Inc. remains a powerhouse in the technology sector, with a track record of innovation and resilience. While challenges abound, the company's strengths outweigh its weaknesses, making it a solid choice for investors seeking long-term growth and stability.""",
            "recommendation": "Buy"
        },
        {
            "user_id": 1,
            "stock_id": 1,
            "content": """Apple Inc. continues to be a driving force in the technology industry, with a strong track record of innovation and financial success. The company's recent earnings report underscored its resilience in the face of economic uncertainty, with robust revenue and profit margins. Apple's ecosystem of hardware, software, and services remains unmatched, providing a seamless experience for users across its product lineup.

            One of Apple's key strengths is its ability to generate excitement and anticipation around new product releases. The launch of the iPhone 14 generated widespread buzz among consumers and investors alike, with early indications pointing to strong demand. Additionally, Apple's expansion into services such as Apple Music, iCloud, and Apple Arcade provides a recurring revenue stream that complements its hardware sales.

            Despite these positive developments, Apple faces several challenges in the competitive tech landscape. Supply chain disruptions, semiconductor shortages, and geopolitical tensions can all impact the company's ability to meet demand and fulfill orders. Moreover, regulatory scrutiny and antitrust concerns loom large, with potential implications for Apple's business practices and market dominance.

            However, Apple's strong brand loyalty and customer retention give it a competitive edge over its rivals. The company's focus on user privacy, data security, and environmental sustainability resonates with today's consumers, enhancing its brand image and customer goodwill. Additionally, Apple's vast cash reserves and prudent financial management provide a buffer against economic headwinds and unforeseen challenges.

            In summary, Apple Inc. remains a solid investment choice for investors seeking exposure to the technology sector. While risks exist, the company's strengths outweigh its weaknesses, positioning it well for long-term growth and value creation.""",
            "recommendation": "Buy"
        },
        {
            "user_id": 2,
            "stock_id": 2,
            "content": "Tesla's position in the electric vehicle (EV) market remains strong, with continued demand for its vehicles worldwide. The company's innovative approach to EV technology, including advancements in battery technology and autonomous driving, sets it apart from competitors. However, concerns persist about production scalability and supply chain constraints. Despite these challenges, Tesla's brand loyalty and aggressive expansion into energy storage and solar solutions bode well for its long-term growth.",
            "recommendation": "Buy"
        },
        {
            "user_id": 3,
            "stock_id": 2,
            "content": "Tesla's recent financial performance has been impressive, driven by strong vehicle deliveries and increasing adoption of renewable energy solutions. The company's Gigafactories and commitment to sustainable transportation position it as a leader in the EV market. However, Tesla faces scrutiny over safety concerns, regulatory issues, and competition from traditional automakers entering the EV space. Despite these challenges, Tesla's innovative technology and visionary leadership make it a promising investment for the future.",
            "recommendation": "Hold"
        },
        {
            "user_id": 4,
            "stock_id": 2,
            "content": "Tesla's stock has experienced significant volatility, reflecting investor sentiment around the company's growth prospects and execution challenges. While Tesla's leadership in EVs and energy solutions is undeniable, concerns persist about production bottlenecks and supply chain disruptions. Additionally, regulatory uncertainties and increased competition pose risks to Tesla's market position. Investors should closely monitor these factors while considering Tesla's long-term potential.",
            "recommendation": "Sell"
        },
        {
            "user_id": 5,
            "stock_id": 2,
            "content": "Tesla's trajectory in the electric vehicle market continues to be a topic of debate among investors. The company's ambitious goals, including ramping up production and expanding into new markets, have fueled optimism among some, while others remain skeptical about its ability to deliver consistent profits. Regulatory challenges, competition, and geopolitical tensions add further complexity to Tesla's outlook. Investors should carefully evaluate these factors before making investment decisions.",
            "recommendation": "Hold"
        },
        {
            "user_id": 5,
            "stock_id": 3,
            "content": "Amazon's dominance in e-commerce and cloud computing remains unparalleled, with robust revenue growth and expanding market reach. The company's Prime membership program, AWS cloud services, and strategic acquisitions continue to drive its success. However, Amazon faces scrutiny over antitrust concerns, labor practices, and regulatory challenges. Despite these headwinds, Amazon's strong financial position and relentless focus on innovation make it a compelling investment choice.",
            "recommendation": "Buy"
        },
        {
            "user_id": 2,
            "stock_id": 3,
            "content": "Amazon's recent performance reflects its resilience and adaptability in a rapidly changing market landscape. The company's diverse revenue streams, including e-commerce, cloud services, and advertising, provide a strong foundation for growth. However, concerns persist about regulatory scrutiny, competition, and labor relations. Despite these challenges, Amazon's customer-centric approach and long-term vision make it an attractive investment opportunity.",
            "recommendation": "Hold"
        },
        {
            "user_id": 3,
            "stock_id": 3,
            "content": "Amazon's stock continues to be a favorite among investors, driven by its dominant position in multiple industries and relentless focus on innovation. The company's investments in fulfillment infrastructure, delivery logistics, and technology development underscore its commitment to long-term growth. However, regulatory challenges, rising competition, and geopolitical uncertainties pose risks to Amazon's business model. Investors should monitor these factors while considering Amazon's potential for future returns.",
            "recommendation": "Buy"
        },
        {
            "user_id": 4,
            "stock_id": 3,
            "content": "Amazon's leadership in e-commerce and cloud computing remains unrivaled, with strong revenue growth and expanding market share. The company's Prime ecosystem, AWS cloud services, and investments in logistics and technology continue to drive its success. However, concerns about regulatory scrutiny, antitrust issues, and labor practices persist. Despite these challenges, Amazon's innovative culture and customer-centric approach position it well for long-term growth.",
            "recommendation": "Buy"
        },
        {
            "user_id": 1,
            "stock_id": 4,
            "content": "Microsoft's position as a leading technology company is underscored by its diverse portfolio of products and services, including Azure cloud services, Office productivity suite, and gaming division. The company's strong financial performance and strategic acquisitions have fueled its growth in recent years. However, competition from rivals like Amazon and Google, as well as regulatory scrutiny, pose risks to Microsoft's market position. Despite these challenges, Microsoft's strong fundamentals and focus on innovation make it a solid investment choice.",
            "recommendation": "Buy"
        },
        {
            "user_id": 2,
            "stock_id": 4,
            "content": "Microsoft's recent performance reflects its continued success in cloud computing, productivity software, and gaming. The company's Azure cloud platform, Office 365 suite, and Xbox gaming division contribute significantly to its revenue and profit. However, Microsoft faces competition from rivals like Amazon and Google, as well as regulatory challenges in various markets. Despite these headwinds, Microsoft's strong financial position and commitment to innovation make it a compelling investment opportunity.",
            "recommendation": "Hold"
        },
        {
            "user_id": 3,
            "stock_id": 4,
            "content": "Microsoft's stock remains a favorite among investors, driven by its leadership in cloud computing, productivity software, and gaming. The company's Azure cloud platform, Office suite, and Xbox division continue to deliver strong financial results. However, competition from rivals like Amazon and Google, as well as regulatory scrutiny, pose risks to Microsoft's growth prospects. Despite these challenges, Microsoft's strong balance sheet and strategic investments make it an attractive long-term investment.",
            "recommendation": "Buy"
        },
        {
            "user_id": 4,
            "stock_id": 4,
            "content": "Microsoft's continued focus on cloud computing, productivity software, and gaming has positioned it as a leader in the technology industry. The company's Azure cloud platform, Office suite, and Xbox gaming division drive significant revenue and profit. However, Microsoft faces challenges from competitors like Amazon and Google, as well as regulatory scrutiny in various markets. Despite these headwinds, Microsoft's strong financial performance and commitment to innovation make it a solid investment choice.",
            "recommendation": "Sell"
        },
        {
            "user_id": 5,
            "stock_id": 5,
            "content": "Alphabet Inc., Class C shares, continues to demonstrate its dominance in the technology sector through its innovative products and strong financial performance. The company's core business, Google, remains the leader in online search and digital advertising, driving significant revenue and profit. Moreover, Alphabet's investments in emerging technologies such as artificial intelligence and autonomous vehicles showcase its commitment to long-term growth. Despite regulatory scrutiny and competition from rivals, Alphabet's diverse revenue streams and strong balance sheet make it a compelling investment option.",
            "recommendation": "Buy"
        },
        {
            "user_id": 6,
            "stock_id": 5,
            "content": "Alphabet Inc., Class C shares, continues to impress investors with its strong performance and innovative approach to technology. The company's core business, Google, remains the dominant force in online search and digital advertising, providing a steady stream of revenue. Additionally, Alphabet's investments in areas such as cloud computing, artificial intelligence, and autonomous vehicles position it for future growth. Despite regulatory challenges and competition from rivals, Alphabet's strong financial position and diverse portfolio make it a solid long-term investment.",
            "recommendation": "Sell"
        },
        {
            "user_id": 7,
            "stock_id": 5,
            "content": "Alphabet Inc., Class C shares, continues to navigate the ever-changing technology landscape with agility and innovation. The company's core business, Google, remains the market leader in online search and digital advertising, driving robust revenue and profit. Furthermore, Alphabet's investments in moonshot projects and emerging technologies demonstrate its commitment to staying ahead of the curve. Despite regulatory hurdles and competition, Alphabet's strong fundamentals and visionary leadership make it a compelling investment opportunity for long-term growth.",
            "recommendation": "Hold"
        },
        {
            "user_id": 8,
            "stock_id": 5,
            "content": "Alphabet Inc., Class C shares, stand out as a beacon of innovation and resilience in the technology sector. The company's core business, Google, continues to dominate online search and digital advertising, fueling Alphabet's strong financial performance. Moreover, Alphabet's investments in areas such as cloud computing, artificial intelligence, and healthcare technology offer promising avenues for future growth. Despite regulatory challenges and competition, Alphabet's track record of innovation and diverse revenue streams make it a compelling investment choice for investors seeking exposure to the tech industry.",
            "recommendation": "Buy"
        }
    ]

    [db.session.add(Analysis(**analysis)) for analysis in analyses]
    db.session.commit()


def undo_analysis_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.analyses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM analyses"))

    db.session.commit()
