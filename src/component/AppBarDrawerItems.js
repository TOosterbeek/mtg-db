import { Link, Typography } from "@mui/material";
import { styled } from '@mui/material/styles'
import StarIcon from "@mui/icons-material/Star";
import { House } from "@mui/icons-material";

const ItemWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    marginLeft: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
}));

const IconWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    pointerEvents: 'none',
    left: `calc(1em + ${theme.spacing(5)})`,
    paddingBottom: 0,
    marginBottom: '0.25em',
}));

const StyledTypographyBase = styled(Typography)(({ theme }) => ({
    textAlign: 'left',
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    alignSelf: 'center',
    verticalAlign: 'center'
}))

export default function AppBarDrawerItems() {

    return (
        <>
            <Link href='/'>
                <ItemWrapper>
                    <IconWrapper>
                        <House fontSize="large"></House>
                    </IconWrapper>
                    <StyledTypographyBase>
                        Home
                    </StyledTypographyBase>
                </ItemWrapper>
            </Link>
            <Link href='/favourites'>
                <ItemWrapper>
                    <IconWrapper>
                        <StarIcon fontSize="large" />
                    </IconWrapper>

                    <StyledTypographyBase>
                        Favourites
                    </StyledTypographyBase>
                </ItemWrapper>
            </Link>
        </>
    );

}