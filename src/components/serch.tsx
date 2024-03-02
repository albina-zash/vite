import React, { useEffect, useState } from 'react';
import SearchService from '../service/searchService';

const getDeterminer = (tags: string[] = []): string => {
  const genderTag = tags.find((tag) => tag === 'Masc' || tag === 'Fem' || tag === 'Neuter');

  switch (genderTag) {
    case 'Masc':
      return 'en';
    case 'Fem':
      return 'ei';
    case 'Neuter':
      return 'et';
    default:
      return '';
  }
};

const SearchButton: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [inflectionDataArray, setInflectionDataArray] = useState<any[]>([]);

  const searchParams = {
    w: 'a',
    dict: 'bm,nn',
    wc: 'NOUN',
    include: 's',
  };

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await SearchService.getArticles({ w: searchTerm, dict: 'bm', wc: 'NOUN' });

      if (response.data.articles.bm.length === 0) {
        setInflectionDataArray([]);
      } else {
        const articleIds = response.data.articles.bm;

        const fetchArticleById = async (articleId: number) => {
          try {
            const articleResponse = await SearchService.getArticleById('bm', articleId.toString(), {});

            const inflectionData = articleResponse.data.lemmas[0].paradigm_info[0].inflection;
            const tags = articleResponse.data.lemmas[0]?.paradigm_info[0].tags;

            // Add tags information to each inflection object
            const inflectionDataWithTag = inflectionData.map((inflection: any) => ({
              ...inflection,
              tags,
            }));

            setInflectionDataArray((prevInflectionDataArray) => [
              ...prevInflectionDataArray,
              inflectionDataWithTag,
            ]);
          } catch (error) {
            console.error(`Error fetching article with ID ${articleId}`, error);
          }
        };

        // Use Promise.all to concurrently fetch articles by ID
        await Promise.all(articleIds.map(fetchArticleById));
      }
    } catch (error) {
      console.error('Error searching articles:', error);
    }
  };

  fetchData(); // Call the asynchronous function
}, [searchTerm, setInflectionDataArray]); // Add setInflectionDataArray to the dependency array


  useEffect(() => {
    searchTerm === '' && setInflectionDataArray([]);
  }, [searchTerm]);

  return (
    <div className="container mt-3" style={{ width: 600 }}>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Søk i Bokmålsordboka"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={{ height: 200 }}>
        {inflectionDataArray.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th colSpan={2}>Entall</th>
                <th colSpan={2}>Flertall</th>
              </tr>
              <tr>
                <th>Ubestemt form</th>
                <th>Bestemt form</th>
                <th>Ubestemt form</th>
                <th>Bestemt form</th>
              </tr>
            </thead>

            <tbody>
              {inflectionDataArray.map((inflections: any[], outerIndex: number) => (
                <tr key={outerIndex}>
                  {inflections.map((inflection: any, innerIndex: number) => (
                    <React.Fragment key={innerIndex}>
                      {innerIndex === 0 && (
                        <td>{getDeterminer(inflection.tags)} {inflection.word_form}</td>
                      )}
                      {innerIndex !== 0 && (
                        <td>{inflection.word_form}</td>
                      )}
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="m-4 alert alert-primary">Skriv inn et ord</div>
        )}
      </div>
    </div>
  );
};

export default SearchButton;
