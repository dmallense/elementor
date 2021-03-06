import { useState, useEffect } from 'react';

import TemplatesFeatures from './components/templates-features/templates-features';
import KitContentCheckbox from './components/kit-content-checkbox/kit-content-checkbox';
import GoProButton from 'elementor-app/molecules/go-pro-button';
import Box from 'elementor-app/ui/atoms/box';
import List from 'elementor-app/ui/molecules/list';
import Heading from 'elementor-app/ui/atoms/heading';
import Text from 'elementor-app/ui/atoms/text';
import Grid from 'elementor-app/ui/grid/grid';

import kitContentData from './kit-content-data/kit-content-data';

import './kit-content.scss';

export default function KitContent() {
	const hasPro = elementorAppConfig.hasPro,
		[ isTipsyLibReady, setIsTipsyLibReady ] = useState( false ),
		[ containerHover, setContainerHover ] = useState( {} ),
		getTemplateFeatures = ( features, index ) => {
			if ( ! features ) {
				return;
			}

			return (
				<TemplatesFeatures
					features={ features }
					isLocked={ ! hasPro }
					showTooltip={ containerHover[ index ] }
					isTipsyLibReady={ isTipsyLibReady }
				/>
			);
		},
		getGoProButton = () => (
			<GoProButton
				className="e-app-export-kit-content__go-pro-button"
				url="https://go.elementor.com/go-pro-import-export"
			/>
		),
		setContainerHoverState = ( index, state ) => {
			setContainerHover( ( prevState ) => ( { ...prevState, [ index ]: state } ) );
		};

	useEffect( () => {
		if ( ! hasPro ) {
			import(
				/* webpackIgnore: true */
				`${ elementorCommon.config.urls.assets }lib/tipsy/tipsy.min.js?ver=1.0.0`
				).then( () => setIsTipsyLibReady( true ) );
		}
	}, [] );

	return (
		<Box>
			<List separated className="e-app-export-kit-content">
				{
					kitContentData.map( ( item, index ) => {
						const isLockedFeaturesNoPro = item.data.features?.locked && ! hasPro;

						return (
							<List.Item separated padding="20" key={ item.type } className="e-app-export-kit-content__item">
								<div
									onMouseEnter={ () => isLockedFeaturesNoPro && setContainerHoverState( index, true ) }
									onMouseLeave={ () => isLockedFeaturesNoPro && setContainerHoverState( index, false ) }
								>
									<Grid container noWrap>
										<KitContentCheckbox type={ item.type } className="e-app-export-kit-content__checkbox" />

										<Grid item>
											<Heading variant="h4" tag="h3" className="e-app-export-kit-content__title">
												{ item.data.title }
											</Heading>

											<Grid item>
												<Text variant="sm" tag="span" className="e-app-export-kit-content__description">
													{ item.data.description || getTemplateFeatures( item.data.features, index ) }
												</Text>

												{ isLockedFeaturesNoPro && getGoProButton() }
											</Grid>
										</Grid>
									</Grid>
								</div>
							</List.Item>
						);
					} )
				}
			</List>
		</Box>
	);
}

KitContent.propTypes = {
	className: PropTypes.string,
};

KitContent.defaultProps = {
	className: '',
};
